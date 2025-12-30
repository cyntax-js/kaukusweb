/**
 * Dynamic Broker Logo Component
 * Renders broker's logo from config or fallback to initials
 */

import { useTheme } from '@/broker-theme/config';
import { cn } from '@/lib/utils';

interface BrokerLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
}

const BrokerLogo = ({ className, size = 'md', showName = false }: BrokerLogoProps) => {
  const { config } = useTheme();
  const { brokerName, branding } = config;

  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-12',
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  if (branding.logoUrl) {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        <img 
          src={branding.logoUrl} 
          alt={brokerName} 
          className={cn(sizeClasses[size], 'object-contain')}
        />
        {showName && (
          <span className={cn('font-bold text-foreground', textSizes[size])}>
            {brokerName}
          </span>
        )}
      </div>
    );
  }

  // Fallback: Show broker name as text logo
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div 
        className={cn(
          'rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold',
          size === 'sm' && 'w-6 h-6 text-xs',
          size === 'md' && 'w-8 h-8 text-sm',
          size === 'lg' && 'w-12 h-12 text-lg',
        )}
      >
        {brokerName?.slice(0, 2).toUpperCase() || 'BR'}
      </div>
      {showName && (
        <span className={cn('font-bold text-foreground', textSizes[size])}>
          {brokerName || 'Broker'}
        </span>
      )}
    </div>
  );
};

export default BrokerLogo;
