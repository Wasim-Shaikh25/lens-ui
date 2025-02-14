import React, { createContext, useContext, useState } from 'react';

const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const showError = (error) => {
    setError({
      message: error.message || 'An unexpected error occurred',
      statusCode: error.status || error.statusCode || 500
    });
  };

  const clearError = () => {
    setError(null);
  };

  const showLoader = () => {
    setLoading(true);
  };

  const hideLoader = () => {
    setLoading(false);
  };

  const value = {
    error,
    loading,
    showError,
    clearError,
    showLoader,
    hideLoader
  };

  return (
    <LoaderContext.Provider value={value}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (context === undefined) {
    throw new Error('useLoader must be used within a LoaderProvider');
  }
  return context;
};