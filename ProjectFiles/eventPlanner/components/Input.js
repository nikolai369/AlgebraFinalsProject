import React from "react";
import { TextInput, StyleSheet } from "react-native";

const Input = (props) => {
  return (
    <TextInput
      placeholderTextColor="#999"
      autoCapitalize="none"
      {...props}
      style={StyleSheet.flatten([styles.input, props.style])}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 5,
    paddingHorizontal: 15,
    borderWidth: 1.66,
    borderRadius: 5,
    borderColor: "#444",
    borderStyle: "solid",
    fontSize: 23,
    fontWeight: "500",
    letterSpacing: 1.3,
    color: "#fff",
    backgroundColor: "#333",
  },
});

export default Input;
