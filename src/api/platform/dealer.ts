/**
 * ============================================================
 * DEALER MANAGEMENT API
 * ============================================================
 * 
 * APIs for dealer onboarding and applications.
 * Used by: Dealer application flow.
 * 
 * To integrate real API:
 *   1. Replace mock responses with fetch calls
 *   2. Add proper validation and error handling
 */

import { mockResponse, generateId, DELAYS } from '../client';

// ============================================================
// TYPES
// ============================================================

export type DealerStatus = 'pending' | 'approved' | 'rejected' | 'active';
export type DealerType = 'bank' | 'market_maker' | 'hedge_fund' | 'proprietary' | 'other';

export interface DealerApplication {
  id: string;
  userId: string;
  institutionName: string;
  institutionType: DealerType;
  registrationNumber: string;
  country: string;
  regulatoryBody: string;
  licenseNumber: string;
  capitalCommitment: string;
  marketsToServe: string[];
  contactEmail: string;
  contactPhone: string;
  status: DealerStatus;
  submittedAt: Date;
  approvedAt?: Date;
}

// ============================================================
// API FUNCTIONS
// ============================================================

/**
 * Submit a dealer application
 */
export async function submitApplication(data: Partial<DealerApplication>): Promise<DealerApplication> {
  // TODO: Replace with real API call
  
  const application: DealerApplication = {
    id: generateId('dealer_app'),
    userId: generateId('user'),
    institutionName: data.institutionName || '',
    institutionType: data.institutionType || 'other',
    registrationNumber: data.registrationNumber || '',
    country: data.country || '',
    regulatoryBody: data.regulatoryBody || '',
    licenseNumber: data.licenseNumber || '',
    capitalCommitment: data.capitalCommitment || '',
    marketsToServe: data.marketsToServe || [],
    contactEmail: data.contactEmail || '',
    contactPhone: data.contactPhone || '',
    status: 'pending',
    submittedAt: new Date(),
  };

  return mockResponse(application, DELAYS.LONG);
}

/**
 * Get application status
 */
export async function getApplicationStatus(applicationId: string): Promise<{ status: DealerStatus; progress: number }> {
  // TODO: Replace with real API call
  return mockResponse({ status: 'pending', progress: 30 }, DELAYS.MEDIUM);
}
