import React, { createContext, useState, useContext } from "react";

// Create Context
const LoaderContext = createContext();

// Provider Component
export const LoaderProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Loader control functions
  const showLoader = () => setIsLoading(true);
  const hideLoader = () => setIsLoading(false);
  const clearError = () => setError(null);

  return (
    <LoaderContext.Provider value={{ isLoading, showLoader, hideLoader  , error, setError, clearError}}>
      {children}
    </LoaderContext.Provider>
  );
};

// Custom Hook to use Loader Context
export const useLoader = () => useContext(LoaderContext);
