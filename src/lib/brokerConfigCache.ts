/**
 * Lightweight localStorage cache for broker selection + bootstrap config.
 *
 * Purpose:
 * - Allow preview broker mode to survive hard reloads even when the URL loses ?broker=
 * - Provide a pre-React cache (bootstrap) and a post-React cache (mapped BrokerConfig)
 */

const LS_LAST_BROKER_KEY = "ContiSX_last_broker";
const LS_BOOTSTRAP_CONFIG_PREFIX = "ContiSX_bootstrap_broker_config:";
const LS_BROKER_CONFIG_PREFIX = "ContiSX_broker_config:";

function safeReadJson<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function safeWriteJson(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore quota / disabled storage
  }
}

export function getCachedBrokerKeyFromLocalStorage(): string | null {
  try {
    return localStorage.getItem(LS_LAST_BROKER_KEY);
  } catch {
    return null;
  }
}

export function setCachedBrokerKeyToLocalStorage(brokerKey: string): void {
  try {
    localStorage.setItem(LS_LAST_BROKER_KEY, brokerKey);
  } catch {
    // ignore
  }
}

export function readCachedBootstrapConfig<T = unknown>(brokerKey: string): T | null {
  return safeReadJson<T>(`${LS_BOOTSTRAP_CONFIG_PREFIX}${brokerKey}`);
}

export function writeCachedBootstrapConfig(brokerKey: string, config: unknown): void {
  setCachedBrokerKeyToLocalStorage(brokerKey);
  safeWriteJson(`${LS_BOOTSTRAP_CONFIG_PREFIX}${brokerKey}`, config);
}

export function readCachedBrokerConfig<T = unknown>(brokerKey: string): T | null {
  return safeReadJson<T>(`${LS_BROKER_CONFIG_PREFIX}${brokerKey}`);
}

export function writeCachedBrokerConfig(brokerKey: string, config: unknown): void {
  setCachedBrokerKeyToLocalStorage(brokerKey);
  safeWriteJson(`${LS_BROKER_CONFIG_PREFIX}${brokerKey}`, config);
}
