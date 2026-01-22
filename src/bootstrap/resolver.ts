/**
 * Subdomain Resolver
 * Detects broker subdomain from hostname or query params (dev mode)
 *
 * CRITICAL RULES:
 * - kaucus.org / www.kaucus.org → Platform mode (NO broker)
 * - egoras.kaucus.org → Broker mode (subdomain = egoras)
 * - localhost with ?broker=X → Broker mode simulation
 */

/** The main production domain */
const PRODUCTION_DOMAIN = "kaucus.org";

/** Development/preview domains that use query param for broker simulation */
const PREVIEW_DOMAINS = ["localhost", "127.0.0.1"];

/** Subdomains that are NOT broker tenants (reserved) */
const RESERVED_SUBDOMAINS = ["www", "api", "admin", "app", "mail", "ftp"];

export type TenantType = "platform" | "broker";

export interface TenantResolution {
  type: TenantType;
  subdomain: string | null;
  /**
   * Router basename to support local preview paths like /preview?broker=egoras
   * Production broker subdomains should use an empty base path.
   */
  basePath: string;
}

/**
 * Check if hostname is a preview/development domain
 */
function isPreviewDomain(host: string): boolean {
  return PREVIEW_DOMAINS.some(
    (domain) => host === domain || host.endsWith(`.${domain}`)
  );
}

/**
 * Check if hostname is exactly the root platform domain
 * kaucus.org or www.kaucus.org → true
 * egoras.kaucus.org → false
 */
function isRootPlatformDomain(host: string): boolean {
  return host === PRODUCTION_DOMAIN || host === `www.${PRODUCTION_DOMAIN}`;
}

/**
 * Check if hostname is a broker subdomain of production domain
 * egoras.kaucus.org → true (subdomain = egoras)
 * kaucus.org → false
 * www.kaucus.org → false
 */
function extractBrokerSubdomain(host: string): string | null {
  // Must end with .kaucus.org
  if (!host.endsWith(`.${PRODUCTION_DOMAIN}`)) {
    return null;
  }

  // Extract the subdomain part
  const subdomain = host.slice(0, -(PRODUCTION_DOMAIN.length + 1));

  // Must have exactly one subdomain (no nested subdomains like a.b.kaucus.org)
  if (subdomain.includes(".")) {
    return null;
  }

  // Must not be a reserved subdomain
  if (RESERVED_SUBDOMAINS.includes(subdomain.toLowerCase())) {
    return null;
  }

  // Must not be empty
  if (!subdomain) {
    return null;
  }

  return subdomain;
}

/**
 * Master tenant resolver - single source of truth
 *
 * Resolution order:
 * 1. Preview domains (localhost) → use ?broker= param
 * 2. Root platform domain (kaucus.org, www.kaucus.org) → platform mode
 * 3. Broker subdomain (*.kaucus.org) → broker mode
 * 4. Unknown domains → platform mode (safe default)
 */
export function resolveTenant(): TenantResolution {
  const host = window.location.hostname;
  const params = new URLSearchParams(window.location.search);
  const brokerParam = params.get("broker");
  const pathname = window.location.pathname;

  console.log("[Resolver] Hostname:", host);

  // Case 1: Preview/development domains
  if (isPreviewDomain(host)) {
    console.log("[Resolver] Preview domain detected");

    if (brokerParam) {
      console.log("[Resolver] Broker param found:", brokerParam);
      // Support local simulation under /preview as a basename
      const basePath = pathname.startsWith("/preview") ? "/preview" : "";
      return { type: "broker", subdomain: brokerParam, basePath };
    }

    // Fallback: check localStorage for previously cached broker key
    // This allows deep links to survive page reloads when ?broker= is missing
    const cachedBrokerKey = getCachedBrokerKeyFromLocalStorage();
    if (cachedBrokerKey && pathname.startsWith("/preview")) {
      console.log("[Resolver] Fallback to cached broker:", cachedBrokerKey);
      return {
        type: "broker",
        subdomain: cachedBrokerKey,
        basePath: "/preview",
      };
    }

    // No broker param on preview = platform mode
    return { type: "platform", subdomain: null, basePath: "" };
  }

  // Case 2: Root platform domain (kaucus.org, www.kaucus.org)
  if (isRootPlatformDomain(host)) {
    console.log("[Resolver] Root platform domain - platform mode");
    return { type: "platform", subdomain: null, basePath: "" };
  }

  // Case 3: Broker subdomain (egoras.kaucus.org)
  const subdomain = extractBrokerSubdomain(host);
  if (subdomain) {
    console.log("[Resolver] Broker subdomain detected:", subdomain);
    return { type: "broker", subdomain, basePath: "" };
  }

  // Case 4: Unknown domain - default to platform (safe fallback)
  console.log("[Resolver] Unknown domain, defaulting to platform mode");
  return { type: "platform", subdomain: null, basePath: "" };
}

/**
 * Get cached broker key from localStorage (for resolver fallback)
 */
function getCachedBrokerKeyFromLocalStorage(): string | null {
  try {
    return localStorage.getItem("ContiSX_last_broker");
  } catch {
    return null;
  }
}

/**
 * Legacy helper - returns subdomain if in broker mode, null otherwise
 */
export function resolveBrokerFromHost(): string | null {
  const resolution = resolveTenant();
  return resolution.subdomain;
}

/**
 * Check if we're in broker mode
 */
export function isBrokerMode(): boolean {
  return resolveTenant().type === "broker";
}

/**
 * Get the full broker API URL
 */
export function getBrokerConfigApiUrl(subdomain: string): string {
  return `https://www.cubegroup.io/api/v2/broker/public/platform/subdomain/${subdomain}`;
}
