import { useEffect, useState } from 'react';
import { ClientApplication, AppBridgeState } from '@shopify/app-bridge';
import { getSessionToken } from '@shopify/app-bridge-utils';

declare global {
  interface Window {
    shopify: ClientApplication<AppBridgeState>;
  }
}

export function useShopifyAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [sessionToken, setSessionToken] = useState<string | null>(null);

  useEffect(() => {
    async function authenticate() {
      try {
        if (!window.shopify) {
          throw new Error('Shopify App Bridge not initialized');
        }

        const token = await getSessionToken(window.shopify);
        if (token) {
          setIsAuthenticated(true);
          setSessionToken(token);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Authentication failed'));
      } finally {
        setIsLoading(false);
      }
    }

    authenticate();
  }, []);

  return { isAuthenticated, isLoading, error, sessionToken };
}
