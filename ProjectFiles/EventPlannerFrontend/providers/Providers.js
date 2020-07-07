import React from "react";
import { AuthProvider } from "./AuthProvider";
import { Routes } from "../navigation/Routes";

export const Providers = (props) => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};
