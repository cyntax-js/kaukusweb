/**
 * Unified Config Loader Hook
 * Handles all config loading logic for broker layouts (PreviewLayout, AppLayout)
 *
 * Priority:
 * 1. Bootstrap config (from subdomain/API)
 * 2. URL ?broker= param config (from API)
 * 3. Deployment store (if meaningful)
 * 4. Demo fallback
 */

import { useEffect, useMemo, useState } from "react";
import type { BrokerConfig } from "../config/types";
import { getSubdomain, loadBrokerConfig } from "../config/engine";
import { mockBrokerConfigs } from "../mocks";
import { useBrokerDeploymentStore } from "@/stores/brokerDeploymentStore";
import { getBrokerConfig, isInBrokerMode } from "@/bootstrap";
import type { BootstrapBrokerConfig } from "@/bootstrap/types";

interface ConfigLoaderResult {
  config: BrokerConfig | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Normalize services array - convert 'spot' to 'stock'
 */
function normalizeServices(services: string[]): BrokerConfig["services"] {
  return services.map((service) => {
    if (service === "spot") return "stock";
    return service;
  }) as BrokerConfig["services"];
}

/**
 * Convert bootstrap config to BrokerConfig format
 */
function mapBootstrapToBrokerConfig(
  bootstrapConfig: BootstrapBrokerConfig,
): BrokerConfig {
  return {
    brokerId: bootstrapConfig.broker_id,
    brokerName: bootstrapConfig.broker_name,
    subdomain: bootstrapConfig.subdomain,
    services: normalizeServices(bootstrapConfig.services),
    template: bootstrapConfig.template,
    theme: {
      colors: bootstrapConfig.theme.colors,
      typography: {
        fontFamily: bootstrapConfig.theme.typography.fontFamily,
        scale: bootstrapConfig.theme.typography.scale as "sm" | "md" | "lg",
      },
      layout: {
        auth: bootstrapConfig.theme.layout.auth as
          | "centered"
          | "split"
          | "image-left",
        dashboard: bootstrapConfig.theme.layout.dashboard as
          | "sidebar"
          | "topnav",
        orderBookPosition: bootstrapConfig.theme.layout.orderBookPosition as
          | "left"
          | "right",
      },
      components: bootstrapConfig.theme.components
        ? {
            cardStyle: bootstrapConfig.theme.components.cardStyle as
              | "flat"
              | "bordered"
              | "elevated",
            buttonSize: bootstrapConfig.theme.components.buttonSize as
              | "sm"
              | "md"
              | "lg",
            borderRadius: bootstrapConfig.theme.components.borderRadius as
              | "none"
              | "sm"
              | "md"
              | "lg"
              | "full",
          }
        : undefined,
    },
    pages: bootstrapConfig.pages,
    branding: bootstrapConfig.branding,
    status: bootstrapConfig.status,
    createdAt: bootstrapConfig.CreatedAt,
    updatedAt: bootstrapConfig.UpdatedAt,
  };
}

/**
 * Check if deployment config has meaningful customizations
 */
function hasMeaningfulConfig(config: BrokerConfig): boolean {
  return Boolean(
    config.subdomain ||
    config.brokerName ||
    config.services.length > 0 ||
    config.branding?.logoUrl ||
    config.branding?.faviconUrl ||
    config.theme.colors.primary !== "217 91% 50%" ||
    config.theme.colors.background !== "210 20% 98%" ||
    config.theme.typography.fontFamily !== "Inter" ||
    config.theme.layout.orderBookPosition !== "right",
  );
}

/**
 * Get broker ID from URL ?broker= param
 */
function getBrokerIdFromUrl(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get("broker");
}

/**
 * Unified hook for loading broker config with priority:
 * 1. Bootstrap config (from subdomain/API)
 * 2. URL ?broker= param (fetch from API)
 * 3. Deployment store (if meaningful)
 * 4. Demo fallback
 */
export function useBrokerConfigLoader(): ConfigLoaderResult {
  const deploymentConfig = useBrokerDeploymentStore((state) => state.config);
  const [asyncConfig, setAsyncConfig] = useState<BrokerConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check bootstrap config first (from subdomain detection)
  const bootstrapConfig = useMemo(() => {
    if (isInBrokerMode()) {
      const config = getBrokerConfig();
      if (config) {
        return mapBootstrapToBrokerConfig(config);
      }
    }
    return null;
  }, []);

  // Check if deployment config should be used (sync check)
  const preferredConfig = useMemo(() => {
    // Bootstrap config takes priority
    if (bootstrapConfig) {
      return bootstrapConfig;
    }

    if (hasMeaningfulConfig(deploymentConfig)) {
      const subdomain = getSubdomain();
      const brokerIdFromUrl = getBrokerIdFromUrl();

      // Use deployment config if no subdomain/param conflict
      if (!subdomain && !brokerIdFromUrl) {
        return deploymentConfig;
      }

      // Use if subdomain matches
      if (subdomain && deploymentConfig.subdomain === subdomain) {
        return deploymentConfig;
      }

      // Use if broker param matches
      if (brokerIdFromUrl && deploymentConfig.subdomain === brokerIdFromUrl) {
        return deploymentConfig;
      }
    }
    return null;
  }, [bootstrapConfig, deploymentConfig]);

  useEffect(() => {
    // If we have a preferred config, use it immediately
    if (preferredConfig) {
      setAsyncConfig(preferredConfig);
      setIsLoading(false);
      return;
    }

    // Otherwise, try async loading
    const load = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Check for ?broker= param first
        const brokerIdFromUrl = getBrokerIdFromUrl();
        if (brokerIdFromUrl) {
          const config = await loadBrokerConfig(brokerIdFromUrl);
          if (config) {
            // Normalize services
            config.services = normalizeServices(config.services);
            setAsyncConfig(config);
            setIsLoading(false);
            return;
          }
        }

        // Try subdomain
        const subdomain = getSubdomain();
        if (subdomain) {
          const config = await loadBrokerConfig(subdomain);
          if (config) {
            // Normalize services
            config.services = normalizeServices(config.services);
            setAsyncConfig(config);
            setIsLoading(false);
            return;
          }
        }

        // Fall back to demo config
        const demoConfig = mockBrokerConfigs.find(
          (c) => c.subdomain === "demo",
        );
        setAsyncConfig(demoConfig ?? mockBrokerConfigs[0] ?? null);

        if (!demoConfig && mockBrokerConfigs.length === 0) {
          setError("Unable to load broker configuration");
        }
      } catch (err) {
        setError("Failed to load broker configuration");
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [preferredConfig]);

  return {
    config: preferredConfig ?? asyncConfig,
    isLoading,
    error,
  };
}
