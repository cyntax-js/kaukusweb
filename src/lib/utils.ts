import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
const CSRF_HEADER_NAME = "X-XSRF-TOKEN";

export const apiFetch = async (url: string, options: RequestInit = {}) => {
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
