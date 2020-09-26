import React from "react";
import { AppProvider } from "./AppProvider";
import { Routes } from "../navigation/Routes";
import { StatusBar } from "react-native";

export const Providers = (props) => {
  return (
    <AppProvider>
      <StatusBar barStyle="light-content" />
      <Routes />
    </AppProvider>
  );
};
