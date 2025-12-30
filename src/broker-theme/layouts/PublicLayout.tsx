/**
 * Public Layout - Wrapper for public broker pages (landing, about, legal, login, signup)
 * Uses LandingHeader with public navigation
 */

import { Outlet } from 'react-router-dom';
import LandingHeader from '@/broker-theme/components/LandingHeader';

export const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <LandingHeader />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};
