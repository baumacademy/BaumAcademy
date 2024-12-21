"use client"
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

interface LocalStorageContextValue<T> {
  state: T;
  setState: React.Dispatch<React.SetStateAction<T>>;
  removeItem: () => void
}

interface LocalStorageProviderProps<T> {
  children: React.ReactNode;
  keyName: string; // Key in localStorage
  defaultValue: T; // Default value if localStorage is empty
}

// Create a context with a generic type
const LocalStorageContext = createContext<LocalStorageContextValue<any> | undefined>(undefined);

export function LocalStorageProvider<T>({ children, keyName, defaultValue }: LocalStorageProviderProps<T>) {
    // if (typeof window === "undefined") return null;
    const isBrowser = typeof window !== "undefined"; 
    const router = useRouter();
  const [state, setState] = useState<T>(() => {
    // Retrieve the initial state from localStorage
    if(isBrowser){
      const storedValue = localStorage.getItem(keyName);
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    }
    return defaultValue
  });
  
  const removeItem = () => localStorage.removeItem(keyName)

  useEffect(() => {
    if (isBrowser) {
      if (!state) {
        router.replace("/"); // Redirect if state is empty
      } else {
        localStorage.setItem(keyName, JSON.stringify(state));
      }
    }
  }, [isBrowser, keyName, router, state]);

  return (
    <LocalStorageContext.Provider value={{ state, setState, removeItem }}>
      {children}
    </LocalStorageContext.Provider>
  );
}

// Custom hook for accessing the context
export function useLocalStorage<T>() {
  const context = useContext(LocalStorageContext);
  if (!context) {
    throw new Error("useLocalStorage must be used within a LocalStorageProvider");
  }
  return context as LocalStorageContextValue<T>;
}
