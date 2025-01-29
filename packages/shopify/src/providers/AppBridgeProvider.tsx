import React, { useMemo } from 'react';
import { createApp } from '@shopify/app-bridge';
import type { ClientApplication } from '@shopify/app-bridge';
import { getSessionToken } from "@shopify/app-bridge-utils";

interface AppBridgeProviderProps {
  children: React.ReactNode;
  host: string;
  apiKey: string;
}

export function AppBridgeProvider({ children, host, apiKey }: AppBridgeProviderProps) {
  useMemo(
    () => createApp({
      host: host,
      apiKey: apiKey,
      forceRedirect: true,
    }),
    [host, apiKey]
  );

  return <>{children}</>;
}

// Utility function to get session token
export async function getShopifySessionToken(app: ClientApplication): Promise<string> {
  try {
    const token = await getSessionToken(app);
    return token;
  } catch (error) {
    console.error('Error getting session token:', error);
    throw error;
  }
}
