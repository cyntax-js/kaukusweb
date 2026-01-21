/**
 * Bootstrap Loader
 * Entry point that runs BEFORE React
 * 
 * This file:
 * 1. Shows a minimal loading state
 * 2. Runs broker detection and config loading
 * 3. Only then imports and runs the React app
 */

import { initializeBrokerBootstrap } from './index';

// Minimal loading indicator (shown before React)
function showLoadingState() {
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background: hsl(0 0% 100%);
        font-family: system-ui, sans-serif;
      ">
        <div style="
          width: 40px;
          height: 40px;
          border: 3px solid #e5e7eb;
          border-top-color: #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        "></div>
        <style>
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        </style>
      </div>
    `;
  }
}

// Error page for broker not found
function showBrokerError(error: string) {
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background: hsl(0 0% 98%);
        font-family: system-ui, sans-serif;
        text-align: center;
        padding: 20px;
      ">
        <h1 style="font-size: 2rem; font-weight: 600; color: #1f2937; margin-bottom: 1rem;">
          Broker Not Found
        </h1>
        <p style="color: #6b7280; max-width: 400px;">
          ${error}
        </p>
      </div>
    `;
  }
}

/**
 * Main bootstrap entry point
 */
async function bootstrap() {
  // Show loading state immediately
  showLoadingState();
  
  try {
    // Run broker detection and config loading
    const result = await initializeBrokerBootstrap();
    
    // If broker mode but config failed, show error
    if (result.isBrokerMode && result.error) {
      showBrokerError(result.error);
      return;
    }
    
    // Clear loading state before React takes over
    const root = document.getElementById('root');
    if (root) {
      root.innerHTML = '';
    }
    
    // Now load and run React
    await import('../main');
    
  } catch (error) {
    console.error('[Bootstrap] Critical error:', error);
    showBrokerError('Failed to initialize application');
  }
}

// Run bootstrap
bootstrap();
