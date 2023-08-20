import { createContext, useContext } from 'react';

export const DemoContext = createContext();

export function useDemo() {
  return useContext(DemoContext);
}

export function DemoProvider({ children }) {
  const isDemoMode = checkDemoMode();  // Logic to check demo mode. E.g., based on a URL parameter.
  return <DemoContext.Provider value={isDemoMode}>{children}</DemoContext.Provider>;
}
