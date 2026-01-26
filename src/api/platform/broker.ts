/**
 * ============================================================
 * BROKER MANAGEMENT API
 * ============================================================
 *
 * APIs for broker onboarding, applications, and dashboard.
 * Used by: Broker application flow, broker dashboard.
 */

import { mockResponse, DELAYS } from "../client";
import { apiClient, getFriendlyErrorMessage } from "@/lib/utils";

// ============================================================
// TYPES
// ============================================================

export type BrokerStatus = "pending" | "approved" | "rejected" | "active";

export type KycType = "broker" | "dealer" | "issuer" | "market_makers";

export interface BrokerDocument {
  id: string;
  name: string;
  type: "license" | "registration" | "kyc" | "financial" | "other";
  fileName: string;
  uploadedAt: Date;
}

export interface CompanyInfo {
  name: string;
  registration_number: string;
  country: string;
  address: string;
  website?: string;
  contact_email: string;
  contact_phone: string;
  operational_capital: string;
}

export interface CompanyResponse {
  company: {
    id: string;
    name: string;
    website: string;
    status: BrokerStatus;
  };
  message: string;
}

export interface KycDocument {
  name: string;
  fileUrls: string[];
}

export interface KycSubmission {
  license_id: string;
  regulatory_body: string;
  documents: KycDocument[];
}

export interface SubmitKycPayload {
  company_id: string;
  legal_name: string;
  incorporation_date: string;
  business_type: string;
  document_type: string;
  kyc_documents: Partial<Record<KycType, KycSubmission>>;
}

export interface KycSubmissionResponse {
  created_kyc_types: KycType[];
  message: string;
}

export interface KycStatusItem {
  company_id: string;
  company_name: string;
  kyc_status: "pending" | "approved" | "rejected";
  kyc_types?: KycType[];
}

export interface KycStatusResponse {
  data: KycStatusItem[];
}

export interface CompanyInfo {
  name: string;
  registration_number: string;
  country: string;
  address: string;
  website?: string;
  contact_email: string;
  contact_phone: string;
  operational_capital: string;
}

export interface CompanyResponse {
  company: {
    id: string;
    name: string;
    website: string;
    status: BrokerStatus;
  };
  message: string;
}

export interface KycDocument {
  name: string;
  fileUrls: string[];
}

export interface KycSubmission {
  license_id: string;
  regulatory_body: string;
  documents: KycDocument[];
}

export interface SubmitKycPayload {
  company_id: string;
  legal_name: string;
  incorporation_date: string;
  business_type: string;
  document_type: string;
  kyc_documents: Partial<Record<KycType, KycSubmission>>;
}

export interface KycSubmissionResponse {
  created_kyc_types: KycType[];
  message: string;
}

export interface KycStatusItem {
  company_id: string;
  company_name: string;
  kyc_status: "pending" | "approved" | "rejected";
  kyc_types?: KycType[];
}

export interface KycStatusResponse {
  data: KycStatusItem[];
}

export interface BrokerApplication {
  id: string;
  userId: string;
  name: string;
  companyId: string;
  registrationNumber: string;
  country: string;
  address: string;
  regulatoryLicense: string;
  licenseNumber: string;
  capitalRequirement: string;
  contactEmail: string;
  contactPhone: string;
  website?: string;
  documents: BrokerDocument[];
  status: BrokerStatus;
  submittedAt: Date;
  approvedAt?: Date;
}

export interface Broker {
  company: {
    id: string;
    name: string;
    website: string;
    status: BrokerStatus;
  };
  message: string;
}

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalVolume: number;
  monthlyRevenue: number;
  totalTrades: number;
  avgOrderSize: number;
}

export interface BrokerUser {
  id: string;
  email: string;
  name: string;
  status: "active" | "blocked" | "restricted";
  balance: number;
  tradingVolume: number;
  joinedAt: Date;
  lastActive: Date;
}

// apiClient is already configured with base URL
// apiClient is already configured with base URL

// ============================================================
// API FUNCTIONS
// ============================================================

/**
 * Submit company information (Step 1)
 */
export async function submitCompanyInfo(
  companyInfo: CompanyInfo
): Promise<CompanyResponse> {
  try {
    const response = await apiClient.post("/broker/company", companyInfo);
    return response.data;
  } catch (error: any) {
    console.log(error.response?.data, "error");
    console.log(
      getFriendlyErrorMessage(error.response?.data?.errors[0]),
      "error"
    );
    throw new Error(error.response?.data?.errors || "Failed to create company");
  }
}

/**
 * Submit KYC documents for multiple license types (Step 2)
 */
export async function submitCompanyKyc(
  payload: SubmitKycPayload
): Promise<KycSubmissionResponse> {
  try {
    const response = await apiClient.post("/broker/company-kyc", payload);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to submit KYC");
  }
}

/**
 * Get KYC approval status
 */
export async function getKycStatus(): Promise<KycStatusResponse> {
  try {
    const response = await apiClient.get("/broker/company-kyc/get-kyc-status");
    console.log(response, "ffff");

    return response.data;
  } catch (error: any) {
    console.log("Error fetching KYC status:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch KYC status"
    );
  }
}

/**
 * Legacy: Submit a broker application (kept for backwards compatibility)
 */
export async function submitApplication(
  request: Partial<BrokerApplication>
): Promise<Broker> {
  const companyInfo: CompanyInfo = {
    name: request.name || "",
    registration_number: request.registrationNumber || "",
    country: request.country || "",
    address: request.address || "",
    website: request.website,
    contact_email: request.contactEmail || "",
    contact_phone: request.contactPhone || "",
    operational_capital: request.capitalRequirement || "",
  };
  return submitCompanyInfo(companyInfo);
}

/**
 * Legacy: Submit company documents (kept for backwards compatibility)
 */

/**
 * Legacy: Submit company documents (kept for backwards compatibility)
 */
export async function submitCompanyDocuments(payload: {
  company_id: string;
  legal_name: string;
  incorporation_date: string;
  business_type: string;
  document_type: string;
  documents: { name: string; fileUrls: string[] }[];
}): Promise<void> {
  const kycPayload: SubmitKycPayload = {
    company_id: payload.company_id,
    legal_name: payload.legal_name,
    incorporation_date: payload.incorporation_date,
    business_type: payload.business_type,
    document_type: payload.document_type,
    kyc_documents: {
      broker: {
        license_id: "",
        regulatory_body: "",
        documents: payload.documents,
      },
    },
  };

  await submitCompanyKyc(kycPayload);
}

/**
 * Get application status (legacy - uses new API)
 * Get application status (legacy - uses new API)
 */
export async function getApplicationStatus(): Promise<{
  status: BrokerStatus;
  approvedKycTypes?: KycType[];
}> {
  try {
    const response = await getKycStatus();

    if (!response.data || response.data.length === 0) {
      return { status: "pending" };
    }

    const item = response.data[0];
    const status =
      item.kyc_status === "approved"
        ? "approved"
        : item.kyc_status === "rejected"
        ? "rejected"
        : "pending";

    return {
      status,
      approvedKycTypes: item.kyc_types,
    };
  } catch (error) {
    console.error("Error fetching application status:", error);
    throw new Error("Failed to fetch application status");
  }
}

/**
 * Get broker dashboard stats
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  return mockResponse(
    {
      totalUsers: 1247,
      activeUsers: 892,
      totalVolume: 15420000,
      monthlyRevenue: 45200,
      totalTrades: 125400,
      avgOrderSize: 2450,
    },
    DELAYS.MEDIUM
  );
}

/**
 * Get broker's user list
 */
export async function getUsers(): Promise<BrokerUser[]> {
  return mockResponse(
    [
      {
        id: "u1",
        email: "john.trader@email.com",
        name: "John Trader",
        status: "active",
        balance: 15420.5,
        tradingVolume: 125000,
        joinedAt: new Date("2024-01-15"),
        lastActive: new Date(),
      },
      {
        id: "u2",
        email: "sarah.invest@email.com",
        name: "Sarah Investor",
        status: "active",
        balance: 52300.0,
        tradingVolume: 890000,
        joinedAt: new Date("2024-02-20"),
        lastActive: new Date(),
      },
      {
        id: "u3",
        email: "mike.day@email.com",
        name: "Mike Daytrader",
        status: "restricted",
        balance: 8750.25,
        tradingVolume: 2450000,
        joinedAt: new Date("2024-03-10"),
        lastActive: new Date("2024-12-15"),
      },
    ] as BrokerUser[],
    DELAYS.MEDIUM
  );
}

/**
 * Update user status
 */
export async function updateUserStatus(
  userId: string,
  status: BrokerUser["status"]
): Promise<void> {
  return mockResponse(undefined, DELAYS.MEDIUM);
}
