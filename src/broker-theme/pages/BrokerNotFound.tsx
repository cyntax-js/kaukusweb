/**
 * Broker 404 Page
 * 
 * Branded not found page that keeps the broker header visible
 * and provides quick links back to Markets, Portfolio, and Home.
 */

import { Link } from 'react-router-dom';
import { useTheme } from '@/broker-theme/config';
import { useBrokerPaths } from '@/broker-theme/hooks/useBrokerPaths';
import { AppHeader } from '@/broker-theme/components';
import { Button } from '@/components/ui/button';
import { Home, TrendingUp, Briefcase, ArrowLeft } from 'lucide-react';

const BrokerNotFound = () => {
  const { config } = useTheme();
  const { publicPrefix, appPrefix } = useBrokerPaths();
  const brokerName = config?.brokerName || 'Platform';

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader />
      
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          {/* 404 Indicator */}
          <div className="mb-8">
            <span className="text-8xl font-bold text-primary/20">404</span>
          </div>
          
          {/* Message */}
          <h1 className="text-2xl font-bold text-foreground mb-3">
            Page Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </p>
          
          {/* Quick Links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to={publicPrefix || '/'}>
              <Button variant="outline" className="gap-2 w-full sm:w-auto">
                <Home className="h-4 w-4" />
                Home
              </Button>
            </Link>
            <Link to={`${appPrefix}/markets`}>
              <Button className="gap-2 w-full sm:w-auto">
                <TrendingUp className="h-4 w-4" />
                Markets
              </Button>
            </Link>
            <Link to={`${appPrefix}/portfolio`}>
              <Button variant="outline" className="gap-2 w-full sm:w-auto">
                <Briefcase className="h-4 w-4" />
                Portfolio
              </Button>
            </Link>
          </div>
          
          {/* Back Link */}
          <div className="mt-8">
            <button 
              onClick={() => window.history.back()}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              <ArrowLeft className="h-3 w-3" />
              Go back to previous page
            </button>
          </div>
          
          {/* Broker Branding */}
          <p className="mt-12 text-xs text-muted-foreground">
            {brokerName} Trading Platform
          </p>
        </div>
      </main>
    </div>
  );
};

export default BrokerNotFound;
