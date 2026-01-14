/**
 * ============================================================
 * PLATFORM AUTHENTICATION API
 * ============================================================
 */

import { apiFetch } from "@/lib/utils";
import { getFriendlyErrorMessage } from "@/lib/utils";

// ============================================================
// TYPES
// ============================================================

export type UserRole = "member" | "broker" | "dealer" | null;

export interface User {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
  state: string;
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  jwt_token?: string;
}

export interface ResendEmailVerificationRequest {
  email: string;
}

export interface VerifyOtpRequest {
  email: string;
  code: string;
}

const apiURL = import.meta.env.VITE_API_URL;

// ============================================================
// API FUNCTIONS
// ============================================================

/**
 * Log in a user with email and password
 */
export async function login(request: LoginRequest): Promise<AuthResponse> {
  const response = await apiFetch(`${apiURL}/auth/identity/caucus`, {
    method: "POST",
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }

  const data = await response.json();

  return {
    user: {
      id: data.uid,
      email: data.email,
      name: data.username || data.name,
      role: data.role,
      state: data.state,
      createdAt: data.created_at,
    },
    jwt_token: data.csrf_token, // the backend is sending it named csrf_token, this line aliases it as jwt_token
  };
}

/**
 * Register a new user
 */
export async function signup(request: SignupRequest): Promise<AuthResponse> {
  const response = await apiFetch(`${apiURL}/auth/identity/users`, {
    method: "POST",
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const errorData = await response.json();

    if (Array.isArray(errorData.errors) && errorData.errors.length > 0) {
      const friendlyErrors = errorData.errors.map((code: string) =>
        getFriendlyErrorMessage(code),
      );

      throw new Error(friendlyErrors.join("\n"));
    }

    throw new Error(
      getFriendlyErrorMessage(errorData.message || "server.error"),
    );
  }

  const data = await response.json();

  return {
    user: {
      id: data.uid,
      email: data.email,
      name: data.username,
      role: data.role,
      state: data.state,
      createdAt: data.created_at,
    },
    jwt_token: data.csrf_token,
  };
}

export async function resendEmailVerification(
  request: ResendEmailVerificationRequest,
): Promise<void> {
  const response = await apiFetch(
    `${apiURL}/auth/identity/users/email/generate_code`,
    {
      method: "POST",
      body: JSON.stringify(request),
    },
  );

  if (!response.ok) {
    const errorData = await response.json();

    if (Array.isArray(errorData.errors) && errorData.errors.length > 0) {
      const friendlyErrors = errorData.errors.map((code: string) =>
        getFriendlyErrorMessage(code),
      );
      throw new Error(friendlyErrors.join("\n"));
    }

    throw new Error(
      getFriendlyErrorMessage(errorData.message || "email.resend_failed"),
    );
  } else {
    console.log(response);
  }
}

export async function verifyOtp(
  request: VerifyOtpRequest,
): Promise<AuthResponse> {
  const response = await apiFetch(
    `${apiURL}/auth/identity/users/email/confirm_code`,
    {
      method: "POST",
      body: JSON.stringify(request),
    },
  );

  if (!response.ok) {
    const errorData = await response.json();

    if (Array.isArray(errorData.errors) && errorData.errors.length > 0) {
      const friendlyErrors = errorData.errors.map((code: string) =>
        getFriendlyErrorMessage(code),
      );
      throw new Error(friendlyErrors.join("\n"));
    }

    throw new Error(
      getFriendlyErrorMessage(errorData.message || "otp.invalid"),
    );
  }

  const data = await response.json();

  return {
    user: {
      id: data.uid,
      email: data.email,
      name: data.username || data.name,
      role: data.role,
      state: data.state, // active or verified
      createdAt: data.created_at,
    },
    jwt_token: data.csrf_token,
  };
}

/**
 * Log out the current user
 */
export async function logout(): Promise<void> {
  try {
    await apiFetch(`${apiURL}/auth/identity/sessions`, {
      method: "DELETE",
    });
  } catch (err) {
    console.warn("Server logout failed:", err);
  }
}
