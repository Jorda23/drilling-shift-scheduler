'use client';

import { createContext, useContext } from 'react';

export interface ColorModeContextType {
  toggleColorMode: () => void;
}

export const ColorModeContext =
  createContext<ColorModeContextType | null>(null);

export function useColorMode() {
  const context = useContext(ColorModeContext);

  if (!context) {
    throw new Error(
      'useColorMode must be used within ColorModeProvider'
    );
  }

  return context;
}
