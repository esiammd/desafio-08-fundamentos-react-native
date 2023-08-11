import React from 'react';

import { CartProvider } from './cart';

interface AppProviderProps {
  children: React.ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => (
  <CartProvider>{children}</CartProvider>
);

export default AppProvider;
