/**
 * Landing page specific header for broker platform
 * Shows: Logo, About, Legal, Get Started
 */

import { Link } from 'react-router-dom';
import { useTheme } from '@/broker-theme/config';
import { useBrokerPaths } from '@/broker-theme/hooks/useBrokerPaths';
import BrokerLogo from './BrokerLogo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import BrokerLanguageSwitcher from './BrokerLanguageSwitcher';

interface LandingHeaderProps {
  className?: string;
}

const LandingHeader = ({ className }: LandingHeaderProps) => {
  const { config } = useTheme();
  const { publicPrefix } = useBrokerPaths();
  
  // Home link - use publicPrefix or "/" if empty
  const homeLink = publicPrefix || '/';

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80',
        className
      )}
    >
      <div className="mx-auto max-w-screen-2xl px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to={homeLink} className="shrink-0">
            <BrokerLogo size="md" showName />
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              to={`${publicPrefix}/about`}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              to={`${publicPrefix}/legal`}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Legal
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <BrokerLanguageSwitcher />
          <Link to={`${publicPrefix}/login`}>
            <Button variant="ghost" size="sm">
              Login
            </Button>
          </Link>
          <Link to={`${publicPrefix}/signup`}>
            <Button size="sm">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;
