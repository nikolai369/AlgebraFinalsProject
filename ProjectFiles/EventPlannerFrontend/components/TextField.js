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
    fontWeight: "bold",
    color: "grey",
    //fontFamily: "Segoe UI",
    marginBottom: 5,
  },
});

export default TextField;
