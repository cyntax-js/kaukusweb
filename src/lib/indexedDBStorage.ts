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

  // prevent multiple open requests happening at once
  if (dbPromise) {
    return dbPromise;
  }

  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      dbPromise = null;
      reject(request.error);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => {
      dbInstance = request.result;
      dbPromise = null; // clear promise so next call uses dbInstance

      /*
        ----------------------------------------------------
        Handle unexpected closures
        ----------------------------------------------------
      */
      dbInstance.onversionchange = () => {
        /*
          another tab has requested a version upgrade.
          we must close this connection to allow it.
        */
        dbInstance?.close();
        dbInstance = null;
      };

      dbInstance.onclose = () => {
        // connection closed unexpectedly (eg user cleared data)
        dbInstance = null;
      };

      resolve(dbInstance);
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
    // if IDB fails, we want Zustand to know so it defaults to initial state.
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(name);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result ?? null);
    });
  },

  setItem: async (name: string, value: string): Promise<void> => {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(value, name);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  },

  removeItem: async (name: string): Promise<void> => {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(name);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  },
};
