import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useLoader } from "../LoaderContext/LoaderContext";

const Loader = () => {
  const { loading } = useLoader();

  if (!loading) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 9999
    }}>
      <CircularProgress />
    </div>
  );
};

export default Loader;