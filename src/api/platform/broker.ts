/**
 * ============================================================
 * BROKER MANAGEMENT API
 * ============================================================
 *
 * APIs for broker onboarding, applications, and dashboard.
 * Used by: Broker application flow, broker dashboard.
 *
 * To integrate real API:
 *   1. Replace mock responses with fetch calls
 *   2. Add proper validation and error handling
 */

import { mockResponse, generateId, DELAYS } from "../client";
import { apiFetch } from "@/lib/utils";

// ============================================================
// TYPES
// ============================================================

export type BrokerStatus = "pending" | "approved" | "rejected" | "active";

export interface BrokerDocument {
  id: string;
  name: string;
  type: "license" | "registration" | "kyc" | "financial" | "other";
  fileName: string;
  uploadedAt: Date;
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

export interface SubmitDocumentsPayload {
  company_id: string;
  legal_name: string;
  incorporation_date: string;
  business_type: string;
  document_type: string;
  documents: {
    name: string;
    fileUrls: string[];
  }[];
}

const apiURL = import.meta.env.VITE_API_URL;

// ============================================================
// API FUNCTIONS
// ============================================================

/**
 * Submit a broker application
 */
export async function submitApplication(
  request: Partial<BrokerApplication>,
): Promise<Broker> {
  const application: BrokerApplication = {
    id: generateId("broker_app"),
    userId: generateId("user"),
    name: request.companyName || "",
    companyId: "817ce15d-aba8-472f-867f-97ca1c30e14f",
    registrationNumber: request.registrationNumber || "",
    country: request.country || "",
    address: request.address || "",
    regulatoryLicense: request.regulatoryLicense || "",
    licenseNumber: request.licenseNumber || "",
    capitalRequirement: request.capitalRequirement || "",
    contactEmail: request.contactEmail || "",
    contactPhone: request.contactPhone || "",
    website: request.website,
    documents: request.documents || [],
    status: "pending",
    submittedAt: new Date(),
  };

  const response = await apiFetch(`${apiURL}/broker/company`, {
    method: "POST",
    body: JSON.stringify(application),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return {
    ...data,
  };
}

export async function submitCompanyDocuments(
  payload: SubmitDocumentsPayload,
): Promise<void> {
  const response = await apiFetch(`${apiURL}/broker/company-kyc`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Failed to submit documents");
  }
}

/**
 * Get application status
 */
export async function getApplicationStatus(
  applicationId: string,
): Promise<{ status: BrokerStatus; progress: number }> {
  // TODO: Replace with real API call
  return mockResponse({ status: "pending", progress: 45 }, DELAYS.MEDIUM);
}

/**
 * Get broker dashboard stats
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  // TODO: Replace with real API call
  return mockResponse(
    {
      totalUsers: 1247,
      activeUsers: 892,
      totalVolume: 15420000,
      monthlyRevenue: 45200,
      totalTrades: 125400,
      avgOrderSize: 2450,
    },
    DELAYS.MEDIUM,
  );
}

/**
 * Get broker's user list
 */
export async function getUsers(): Promise<BrokerUser[]> {
  // TODO: Replace with real API call
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
    DELAYS.MEDIUM,
  );
}

/**
 * Update user status
 */
export async function updateUserStatus(
  userId: string,
  status: BrokerUser["status"],
): Promise<void> {
  // TODO: Replace with real API call
  return mockResponse(undefined, DELAYS.MEDIUM);
}
