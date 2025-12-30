import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  BrokerConfig,
  BrokerService,
  BrokerTemplate,
  BrokerTheme,
} from "@/broker-theme/config";
import {
  templatePresets,
  defaultBrokerConfig,
  registerBrokerConfig,
} from "@/broker-theme/config";
import { indexedDBStateStorage } from "@/lib/indexedDBStorage";

const STORAGE_KEY = "ContisX_broker_deployment_draft";

type DeploymentStep =
  | "welcome"
  | "services"
  | "theme"
  | "layout"
  | "confirmation"
  | "payment"
  | "preview";

interface ServiceOption {
  id: BrokerService;
  name: string;
  description: string;
  price: number;
}

interface BrokerDeploymentStore {
  currentStep: DeploymentStep;

  // Broker config being built
  config: BrokerConfig;

  // Available service options with pricing
  availableServices: ServiceOption[];

  // Pricing
  templatePrice: number;
  totalCost: number;

  // Deployment state
  isDeployed: boolean;
  isProcessingPayment: boolean;

  // Actions
  setStep: (step: DeploymentStep) => void;
  nextStep: () => void;
  prevStep: () => void;

  // Service management
  toggleService: (service: BrokerService) => void;

  // Template & Theme
  setTemplate: (template: BrokerTemplate) => void;
  setThemeColors: (colors: Partial<BrokerTheme["colors"]>) => void;
  setTypography: (typography: Partial<BrokerTheme["typography"]>) => void;
  setLayoutVariant: <K extends keyof BrokerTheme["layout"]>(
    key: K,
    value: BrokerTheme["layout"][K]
  ) => void;
  setLayout: (layout: Partial<BrokerTheme["layout"]>) => void;

  // Branding
  setBrokerName: (name: string) => void;
  setLogo: (logoUrl: string | undefined) => void;
  setFavicon: (faviconUrl: string | undefined) => void;

  // Pages
  togglePage: (page: keyof BrokerConfig["pages"]) => void;

  // Pricing
  calculateTotal: () => void;

  // Deployment
  processPayment: () => Promise<boolean>;
  deployBroker: () => Promise<BrokerConfig>;

  // Utils
  reset: () => void;
  clearDraft: () => void;
  hasDraft: () => boolean;
  getPreviewUrl: (page?: string) => string;
  getConfig: () => BrokerConfig;
}

const stepOrder: DeploymentStep[] = [
  "welcome",
  "services",
  "theme",
  "layout",
  "confirmation",
  "payment",
  "preview",
];

const TEMPLATE_PRICE = 499;

const SERVICE_OPTIONS: ServiceOption[] = [
  {
    id: "spot",
    name: "Spot Trading",
    description: "Buy and sell assets at current market prices",
    price: 299,
  },
  {
    id: "futures",
    name: "Futures Trading",
    description: "Trade contracts for future delivery",
    price: 499,
  },
  {
    id: "options",
    name: "Options Trading",
    description: "Trade options contracts",
    price: 399,
  },
  {
    id: "private_markets",
    name: "Private Markets",
    description: "Access to private market offerings",
    price: 599,
  },
];

const createInitialConfig = (): BrokerConfig => ({
  ...defaultBrokerConfig,
  brokerId: crypto.randomUUID(),
  brokerName: "",
  subdomain: "",
  services: [], // Empty by default - broker selects during configuration
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

export const useBrokerDeploymentStore = create<BrokerDeploymentStore>()(
  persist(
    (set, get) => ({
      currentStep: "welcome",
      config: createInitialConfig(),
      availableServices: SERVICE_OPTIONS,
      templatePrice: TEMPLATE_PRICE,
      totalCost: 0,
      isDeployed: false,
      isProcessingPayment: false,

      setStep: (step) => set({ currentStep: step }),

      nextStep: () => {
        const currentIndex = stepOrder.indexOf(get().currentStep);
        if (currentIndex < stepOrder.length - 1) {
          set({ currentStep: stepOrder[currentIndex + 1] });
        }
      },

      prevStep: () => {
        const currentIndex = stepOrder.indexOf(get().currentStep);
        if (currentIndex > 0) {
          set({ currentStep: stepOrder[currentIndex - 1] });
        }
      },

      toggleService: (service) => {
        const current = get().config.services;
        const updated = current.includes(service)
          ? current.filter((s) => s !== service)
          : [...current, service];

        set({
          config: {
            ...get().config,
            services: updated,
            updatedAt: new Date().toISOString(),
          },
        });
        get().calculateTotal();
      },

      setTemplate: (template) => {
        const preset = templatePresets.find((p) => p.id === template);
        if (preset) {
          set({
            config: {
              ...get().config,
              template,
              theme: preset.theme,
              updatedAt: new Date().toISOString(),
            },
          });
        }
      },

      setThemeColors: (colors) => {
        set({
          config: {
            ...get().config,
            theme: {
              ...get().config.theme,
              colors: {
                ...get().config.theme.colors,
                ...colors,
              },
            },
            updatedAt: new Date().toISOString(),
          },
        });
      },

      setTypography: (typography) => {
        set({
          config: {
            ...get().config,
            theme: {
              ...get().config.theme,
              typography: {
                ...get().config.theme.typography,
                ...typography,
              },
            },
            updatedAt: new Date().toISOString(),
          },
        });
      },

      setLayoutVariant: (key, value) => {
        set({
          config: {
            ...get().config,
            theme: {
              ...get().config.theme,
              layout: {
                ...get().config.theme.layout,
                [key]: value,
              },
            },
            updatedAt: new Date().toISOString(),
          },
        });
      },

      setLayout: (layout) => {
        set({
          config: {
            ...get().config,
            theme: {
              ...get().config.theme,
              layout: {
                ...get().config.theme.layout,
                ...layout,
              },
            },
            updatedAt: new Date().toISOString(),
          },
        });
      },

      setBrokerName: (name) => {
        const subdomain = name
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "-")
          .replace(/-+/g, "-")
          .replace(/^-|-$/g, "");

        set({
          config: {
            ...get().config,
            brokerName: name,
            subdomain,
            updatedAt: new Date().toISOString(),
          },
        });
      },

      setLogo: (logoUrl) => {
        set({
          config: {
            ...get().config,
            branding: {
              ...get().config.branding,
              logoUrl,
            },
            updatedAt: new Date().toISOString(),
          },
        });
      },

      setFavicon: (faviconUrl) => {
        set({
          config: {
            ...get().config,
            branding: {
              ...get().config.branding,
              faviconUrl,
            },
            updatedAt: new Date().toISOString(),
          },
        });
      },

      togglePage: (page) => {
        set({
          config: {
            ...get().config,
            pages: {
              ...get().config.pages,
              [page]: !get().config.pages[page],
            },
            updatedAt: new Date().toISOString(),
          },
        });
      },

      calculateTotal: () => {
        const { config, availableServices, templatePrice } = get();
        const servicesTotal = config.services.reduce((sum, serviceId) => {
          const service = availableServices.find((s) => s.id === serviceId);
          return sum + (service?.price || 0);
        }, 0);
        set({ totalCost: servicesTotal + templatePrice });
      },

      processPayment: async () => {
        set({ isProcessingPayment: true });
        await new Promise((resolve) => setTimeout(resolve, 2500));
        set({ isProcessingPayment: false });
        return true;
      },

      deployBroker: async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const finalConfig: BrokerConfig = {
          ...get().config,
          status: "active",
          updatedAt: new Date().toISOString(),
        };

        // Register the broker config in the mock registry so subdomain previews work
        registerBrokerConfig(finalConfig);

        set({
          isDeployed: true,
          config: finalConfig,
        });
        // Clear persisted draft after successful deployment
        get().clearDraft();
        return finalConfig;
      },

      getPreviewUrl: (page = "") => {
        const { config } = get();
        const broker = config.subdomain || "demo";
        const pageRoute = page ? `/${page}` : "";

        // Use same-origin URL with ?broker=... so previews always load the deployed theme.
        // (Subdomain.localhost URLs are a different origin and can't access this origin's persisted state.)
        const url = new URL(
          `${window.location.protocol}//${window.location.host}/preview${pageRoute}`
        );
        url.searchParams.set("broker", broker);
        return url.toString();
      },

      getConfig: () => get().config,

      hasDraft: () => {
        const { config } = get();
        // Check if there's meaningful data in the draft
        return config.brokerName.length > 0 || config.services.length > 0;
      },

      clearDraft: () => {
        // Remove from localStorage
        localStorage.removeItem(STORAGE_KEY);
      },

      reset: () =>
        set({
          currentStep: "welcome",
          config: createInitialConfig(),
          totalCost: 0,
          isDeployed: false,
          isProcessingPayment: false,
        }),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => indexedDBStateStorage),
      partialize: (state) => ({
        currentStep: state.currentStep,
        config: state.config,
        totalCost: state.totalCost,
      }),
      onRehydrateStorage: () => (state) => {
        // After rehydrating from storage, register the config if it was deployed
        if (state?.config?.subdomain && state?.config?.status === "active") {
          registerBrokerConfig(state.config);
        }
      },
    }
  )
);
