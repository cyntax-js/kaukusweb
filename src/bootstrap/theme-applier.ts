/**
 * Theme Applier
 * Applies broker theme BEFORE React loads
 */

import type { BootstrapBrokerConfig } from './types';

/**
 * Apply CSS variables from broker theme
 */
export function applyThemeVariables(config: BootstrapBrokerConfig): void {
  const { theme } = config;
  const root = document.documentElement;
  
  // Apply color variables
  if (theme.colors) {
    root.style.setProperty('--primary', theme.colors.primary);
    root.style.setProperty('--accent', theme.colors.accent);
    root.style.setProperty('--background', theme.colors.background);
    root.style.setProperty('--foreground', theme.colors.foreground);
    
    // Derived colors (simplified)
    root.style.setProperty('--card', theme.colors.background);
    root.style.setProperty('--card-foreground', theme.colors.foreground);
    root.style.setProperty('--popover', theme.colors.background);
    root.style.setProperty('--popover-foreground', theme.colors.foreground);
    root.style.setProperty('--primary-foreground', '0 0% 100%');
  }
  
  // Apply component styles
  if (theme.components) {
    if (theme.components.borderRadius) {
      const radiusMap: Record<string, string> = {
        none: '0',
        sm: '0.25rem',
        md: '0.5rem',
        lg: '0.75rem',
        full: '9999px',
      };
      root.style.setProperty('--radius', radiusMap[theme.components.borderRadius] || '0.5rem');
    }
    
    if (theme.components.cardStyle) {
      document.body.setAttribute('data-card-style', theme.components.cardStyle);
    }
  }
}

/**
 * Load and apply font
 */
export function applyFont(fontFamily: string): void {
  // Check if font is already loaded
  const existingLink = document.querySelector(`link[href*="${fontFamily.replace(/\s+/g, '+')}"]`);
  if (existingLink) return;
  
  // Create font link
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/\s+/g, '+')}:wght@300;400;500;600;700;800&display=swap`;
  document.head.appendChild(link);
  
  // Apply to body
  document.body.style.fontFamily = `"${fontFamily}", system-ui, sans-serif`;
}

/**
 * Apply branding (favicon, title)
 */
export function applyBranding(config: BootstrapBrokerConfig): void {
  // Set document title
  document.title = config.broker_name;
  
  // Set favicon
  if (config.branding?.faviconUrl) {
    let favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (!favicon) {
      favicon = document.createElement('link');
      favicon.rel = 'icon';
      document.head.appendChild(favicon);
    }
    favicon.href = config.branding.faviconUrl;
  }
  
  // Update OG tags
  const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.content = config.broker_name;
  }
}

/**
 * Apply all theme and branding at once
 */
export function applyFullTheme(config: BootstrapBrokerConfig): void {
  applyThemeVariables(config);
  applyFont(config.theme.typography.fontFamily);
  applyBranding(config);
}
