import React from "react";
import { useLoader } from "../LoaderContext/LoaderContext";
import "./errorhandler.css";

const GlobalError = () => {
  const { error, clearError } = useLoader();

  if (!error) return null;

  return (
    <div className="global-error">
      <div className="error-message">
        <p>
          <strong>Error {error.statusCode}:</strong> {error.message}
        </p>
        <button onClick={clearError}>Close</button>
      </div>
    </div>
  );
};

export default GlobalError;