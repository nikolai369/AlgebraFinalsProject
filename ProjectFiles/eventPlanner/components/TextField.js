import React from "react";
import { Text, StyleSheet } from "react-native";

const TextField = (props) => {
  return (
    <Text
      {...props}
      style={StyleSheet.flatten([styles.textStyle, props.style])}
    >
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 26,
    letterSpacing: 1.6,
    color: "white",
  },
});

export default TextField;
