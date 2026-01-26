/**
 * ============================================================
 * PLATFORM AUTHENTICATION API
 * ============================================================
 */

import { apiClient } from "@/lib/utils";
import { getFriendlyErrorMessage } from "@/lib/utils";

// ============================================================
// TYPES
// ============================================================

export type UserRole = "member" | "broker" | "dealer" | null;

export interface BrokerPlatform {
  id: number;
  user_id: number;
  platform: string;
  company_id: string;
  broker_num: string;
  created_at: string;
  updated_at: string;
}

export interface UserLabel {
  key: string;
  value: string;
  scope: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
  state: string;
  createdAt: string;
  level?: number;
  otp?: boolean;
  labels?: UserLabel[];
  broker_platforms?: BrokerPlatform[];
  phone?: string | null;
  profiles?: object[];
  data_storages?: object[];
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

export interface UserResponse {
  companies: object[];
  domains: [];
  kyc: object[];
  payments: object[];
  services: [];
}

const apiURL = import.meta.env.VITE_API_URL;

// ============================================================
// API FUNCTIONS
// ============================================================

/**
 * Log in a user with email and password
 */
export async function login(request: LoginRequest): Promise<AuthResponse> {
  try {
    const response = await apiClient.post("/auth/identity/caucus", request);

    console.log(response, "loginresponse");

    const data = await response.data;

    return {
      user: {
        id: data.uid,
        email: data.email,
        name: data.username || data.name,
        role: data.role,
        state: data.state,
        createdAt: data.created_at,
        level: data.level,
        otp: data.otp,
        labels: data.labels,
        broker_platforms: data.broker_platforms,
        phone: data.phone,
        profiles: data.profiles,
        data_storages: data.data_storages,
      },
      jwt_token: data.csrf_token,
    };
  } catch (error) {
    const message = error.message || "Login failed";
    throw new Error(message);
  }
}

/**
 * Register a new user
 */

export async function signup(request: SignupRequest): Promise<AuthResponse> {
  try {
    const response = await apiClient.post("/auth/identity/users", request);
    const data = await response.data;
    return {
      user: {
        id: data.uid,
        email: data.email,
        name: data.username,
        role: data.role,
        state: data.state,
        createdAt: data.created_at,
        level: data.level,
        otp: data.otp,
        labels: data.labels,
        broker_platforms: data.broker_platforms,
      },
      jwt_token: data.csrf_token,
    };
  } catch (error) {
    const errorData = error.response?.data;

    if (
      errorData &&
      Array.isArray(errorData.errors) &&
      errorData.errors.length > 0
    ) {
      const friendlyErrors = errorData.errors.map((code: string) =>
        getFriendlyErrorMessage(code)
      );

      throw new Error(friendlyErrors.join("\n"));
    }

    throw new Error(
      getFriendlyErrorMessage(
        errorData?.message || error.message || "server.error"
      )
    );
  }
}

export async function resendEmailVerification(
  request: ResendEmailVerificationRequest
): Promise<void> {
  try {
    await apiClient.post("/auth/identity/users/email/generate_code", request);
    console.log("Verification mail sent successfully");
  } catch (error) {
    const errorData = error.response?.data;

    if (errorData) {
      if (Array.isArray(errorData.errors) && errorData.errors.length > 0) {
        const friendlyErrors = errorData.errors.map((code: string) =>
          getFriendlyErrorMessage(code)
        );
        throw new Error(friendlyErrors.join("\n"));
      }

      if (errorData.message) {
        throw new Error(getFriendlyErrorMessage(errorData.message));
      }
    }

    throw new Error(
      getFriendlyErrorMessage(error.message || "email.resend_failed")
    );
  }
}

export async function verifyOtp(
  request: VerifyOtpRequest
): Promise<AuthResponse> {
  try {
    const response = await apiClient.post(
      "/auth/identity/users/email/confirm_code",
      request
    );
    const data = await response.data;
    return {
      user: {
        id: data.uid,
        email: data.email,
        name: data.username || data.name,
        role: data.role,
        state: data.state,
        createdAt: data.created_at,
        level: data.level,
        otp: data.otp,
        labels: data.labels,
        broker_platforms: data.broker_platforms,
      },
      jwt_token: data.csrf_token,
    };
  } catch (error) {
    const errorData = error.response?.data;

    if (errorData) {
      if (Array.isArray(errorData.errors) && errorData.errors.length > 0) {
        const friendlyErrors = errorData.errors.map((code: string) =>
          getFriendlyErrorMessage(code)
        );
        throw new Error(friendlyErrors.join("\n"));
      }

      if (errorData.message) {
        throw new Error(getFriendlyErrorMessage(errorData.message));
      }
    }

    throw new Error(
      getFriendlyErrorMessage(error.message || "email.resend_failed")
    );
  }
}

export async function getUser(): Promise<UserResponse> {
  try {
    const response = await apiClient.get("/broker/user");
    return {
      companies: response.data.companies,
      domains: response.data.domains,
      kyc: response.data.kyc,
      payments: response.data.payments,
      services: response.data.services,
    };
  } catch (error) {
    const errorData = error.response?.data;
    console.error(errorData);
    throw new Error(errorData.message || "user.fetch.failed");
  }
}

/**
 * Log out the current user
 */
export async function logout(): Promise<void> {
  try {
    await apiClient.delete(`${apiURL}/auth/identity/sessions`);
  } catch (err) {
    console.warn("Server logout failed:", err);
  }
}
