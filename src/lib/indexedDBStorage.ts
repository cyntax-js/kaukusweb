/**
 * IndexedDB Storage Adapter for Zustand Persist
 * Replaces localStorage with IndexedDB for better persistence
 * Compatible with Zustand's createJSONStorage wrapper
 */

import type { StateStorage } from "zustand/middleware";

const DB_NAME = "ContiSX_storage";
const DB_VERSION = 1;
const STORE_NAME = "zustand_store";

let dbInstance: IDBDatabase | null = null;
let dbPromise: Promise<IDBDatabase> | null = null;

const getDB = (): Promise<IDBDatabase> => {
  if (dbInstance) {
    return Promise.resolve(dbInstance);
  }

  if (dbPromise) {
    return dbPromise;
  }

  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      dbPromise = null;
      reject(request.error);
    };

    request.onsuccess = () => {
      dbInstance = request.result;
      resolve(dbInstance);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
  });

  return dbPromise;
};

/**
 * IndexedDB StateStorage implementation
 * Use with createJSONStorage(() => indexedDBStateStorage)
 */
export const indexedDBStateStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    try {
      const db = await getDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readonly");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(name);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          resolve(request.result ?? null);
        };
      });
    } catch (error) {
      console.warn(
        "IndexedDB getItem failed, falling back to localStorage:",
        error
      );
      return localStorage.getItem(name);
    }
  },

  setItem: async (name: string, value: string): Promise<void> => {
    try {
      const db = await getDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.put(value, name);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve();
      });
    } catch (error) {
      console.warn(
        "IndexedDB setItem failed, falling back to localStorage:",
        error
      );
      localStorage.setItem(name, value);
    }
  },

  removeItem: async (name: string): Promise<void> => {
    try {
      const db = await getDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.delete(name);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve();
      });
    } catch (error) {
      console.warn(
        "IndexedDB removeItem failed, falling back to localStorage:",
        error
      );
      localStorage.removeItem(name);
    }
  },
};
