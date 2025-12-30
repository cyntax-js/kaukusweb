/**
 * Auth Layout - Variant-based layout for login/signup pages
 */

import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/broker-theme/config';

interface AuthLayoutProps {
  children: ReactNode;
  variant?: 'centered' | 'split' | 'image-left';
  title?: string;
  subtitle?: string;
}

export const AuthLayout = ({ children, variant: variantOverride, title, subtitle }: AuthLayoutProps) => {
  const { config } = useTheme();
  const variant = variantOverride || config.theme.layout.auth;

  if (variant === 'centered') {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="p-6">
          <Link to="/preview" className="flex items-center gap-2">
            {config.branding.logoUrl ? (
              <img src={config.branding.logoUrl} alt={config.brokerName} className="h-8" />
            ) : (
              <span className="text-xl font-bold text-foreground">{config.brokerName}</span>
            )}
          </Link>
        </header>
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            {(title || subtitle) && (
              <div className="text-center mb-8">
                {title && <h1 className="text-3xl font-bold text-foreground">{title}</h1>}
                {subtitle && <p className="mt-2 text-muted-foreground">{subtitle}</p>}
              </div>
            )}
            <div className="bg-card rounded-lg border border-border p-8 shadow-sm">{children}</div>
          </div>
        </main>
      </div>
    );
  }

  if (variant === 'split') {
    return (
      <div className="min-h-screen flex">
        <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80" />
          <div className="relative z-10 flex flex-col justify-center p-12 text-primary-foreground">
            <Link to="/preview" className="mb-8">
              <span className="text-2xl font-bold">{config.brokerName}</span>
            </Link>
            <h2 className="text-4xl font-bold mb-4">Start Trading Today</h2>
            <p className="text-lg opacity-90">Join thousands of traders on the most trusted platform.</p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col">
          <main className="flex-1 flex items-center justify-center p-6 lg:p-12">
            <div className="w-full max-w-md">
              {(title || subtitle) && (
                <div className="mb-8">
                  {title && <h1 className="text-3xl font-bold text-foreground">{title}</h1>}
                  {subtitle && <p className="mt-2 text-muted-foreground">{subtitle}</p>}
                </div>
              )}
              {children}
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Default centered
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
};
