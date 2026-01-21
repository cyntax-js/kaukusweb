import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};

export const setCookie = (name: string, value: string, days = 1) => {
  if (typeof document === "undefined") return;

  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;

  document.cookie = `${name}=${value}; ${expires}; path=/; Secure; SameSite=Strict`;
};

const CSRF_COOKIE_NAME = "XSRF-TOKEN";
const CSRF_HEADER_NAME = "X-CSRF-Token";

export const apiFetch = async (url: string, options: RequestInit = {}) => {
  const headers = new Headers(options.headers);

  const token = localStorage.getItem("auth_token");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  return response;
};
/*
  if (response.status === 401) {
    localStorage.removeItem("auth_token");
    if (window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
  }
  */

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "",
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: trueg,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      // for JWT
      config.headers.Authorization = `Bearer ${token}`;
      // for CSRF
      config.headers[CSRF_HEADER_NAME] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // dispatch the event. can be used to log the user out
      window.dispatchEvent(new Event("auth:unauthorized"));
    }
    return Promise.reject(error);
  }
);

export const apiFetchCookie = async (
  url: string,
  options: RequestInit = {}
) => {
  const headers = new Headers(options.headers || {});

  const csrfToken = getCookie(CSRF_COOKIE_NAME);

  if (csrfToken) {
    headers.set(CSRF_HEADER_NAME, csrfToken);
  }

  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: "include",
  });

  return response;
};

const ERROR_MESSAGES: Record<string, string> = {
  // email Errors
  "email.taken": "This email address is already registered. Please log in.",
  "email.invalid": "Please enter a valid email address.",

  // password Errors
  "password.requirements":
    "Password must contain an uppercase letter and numbers.",
};

/**
 * Converts a backend error code into a friendly message.
 * Falls back to the raw code if no mapping is found.
 */
export const getFriendlyErrorMessage = (code: string): string => {
  // Handle edge case where code might be undefined or not a string
  if (!code || typeof code !== "string") return "An unexpected error occurred.";

  return ERROR_MESSAGES[code] || code;
};
