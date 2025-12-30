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

import { mockResponse, generateId, DELAYS } from '../client';

// ============================================================
// TYPES
// ============================================================

export type BrokerStatus = 'pending' | 'approved' | 'rejected' | 'active';

export interface BrokerDocument {
  id: string;
  name: string;
  type: 'license' | 'registration' | 'kyc' | 'financial' | 'other';
  fileName: string;
  uploadedAt: Date;
}

export interface BrokerApplication {
  id: string;
  userId: string;
  companyName: string;
  registrationNumber: string;
  country: string;
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
  status: 'active' | 'blocked' | 'restricted';
  balance: number;
  tradingVolume: number;
  joinedAt: Date;
  lastActive: Date;
}

// ============================================================
// API FUNCTIONS
// ============================================================

/**
 * Submit a broker application
 */
export async function submitApplication(data: Partial<BrokerApplication>): Promise<BrokerApplication> {
  // TODO: Replace with real API call
  
  const application: BrokerApplication = {
    id: generateId('broker_app'),
    userId: generateId('user'),
    companyName: data.companyName || '',
    registrationNumber: data.registrationNumber || '',
    country: data.country || '',
    regulatoryLicense: data.regulatoryLicense || '',
    licenseNumber: data.licenseNumber || '',
    capitalRequirement: data.capitalRequirement || '',
    contactEmail: data.contactEmail || '',
    contactPhone: data.contactPhone || '',
    website: data.website,
    documents: data.documents || [],
    status: 'pending',
    submittedAt: new Date(),
  };

  return mockResponse(application, DELAYS.LONG);
}

/**
 * Get application status
 */
export async function getApplicationStatus(applicationId: string): Promise<{ status: BrokerStatus; progress: number }> {
  // TODO: Replace with real API call
  return mockResponse({ status: 'pending', progress: 45 }, DELAYS.MEDIUM);
}

/**
 * Get broker dashboard stats
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  // TODO: Replace with real API call
  return mockResponse({
    totalUsers: 1247,
    activeUsers: 892,
    totalVolume: 15420000,
    monthlyRevenue: 45200,
    totalTrades: 125400,
    avgOrderSize: 2450,
  }, DELAYS.MEDIUM);
}

/**
 * Get broker's user list
 */
export async function getUsers(): Promise<BrokerUser[]> {
  // TODO: Replace with real API call
  return mockResponse([
    { id: 'u1', email: 'john.trader@email.com', name: 'John Trader', status: 'active', balance: 15420.50, tradingVolume: 125000, joinedAt: new Date('2024-01-15'), lastActive: new Date() },
    { id: 'u2', email: 'sarah.invest@email.com', name: 'Sarah Investor', status: 'active', balance: 52300.00, tradingVolume: 890000, joinedAt: new Date('2024-02-20'), lastActive: new Date() },
    { id: 'u3', email: 'mike.day@email.com', name: 'Mike Daytrader', status: 'restricted', balance: 8750.25, tradingVolume: 2450000, joinedAt: new Date('2024-03-10'), lastActive: new Date('2024-12-15') },
  ] as BrokerUser[], DELAYS.MEDIUM);
}

/**
 * Update user status
 */
export async function updateUserStatus(userId: string, status: BrokerUser['status']): Promise<void> {
  // TODO: Replace with real API call
  return mockResponse(undefined, DELAYS.MEDIUM);
}
