import React from "react";
import { ActivityIndicator } from "react-native";

import Center from "./Center";
import colors from "../constants/colors";

const Loading = () => {
  return (
    <Center>
      <ActivityIndicator size="large" color={colors.orange} />
    </Center>
  );
};

export default Loading;
