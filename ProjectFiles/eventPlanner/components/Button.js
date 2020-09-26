import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

import TextField from "./TextField";
import colors from "../constants/colors";

const Button = (props) => {
  const { boxStyle, titleStyle, title, disabled, onPress } = props;

  return (
    <TouchableOpacity
      style={StyleSheet.flatten([styles.boxStyle, boxStyle])}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.6}
    >
      <TextField style={StyleSheet.flatten([styles.titleStyle, titleStyle])}>
        {title}
      </TextField>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  boxStyle: {
    height: 46,
    width: "87%",
    borderRadius: 5,
    backgroundColor: colors.orange,
    justifyContent: "center",
    alignItems: "center",
  },
  titleStyle: {
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "#eee",
  },
});

export default Button;
