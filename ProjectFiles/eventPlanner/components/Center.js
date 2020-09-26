import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../constants/colors";

const Center = (props) => {
  return (
    <View style={StyleSheet.flatten([styles.screen, { ...props.style }])}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#222",
  },
});

export default Center;
