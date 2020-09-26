import React from "react";
import { View, StyleSheet, Platform } from "react-native";

import TextField from "./TextField";
import Input from "./Input";
import colors from "../constants/colors";

const isWeb = Platform.OS === "web";

const FormField = (props) => {
  const {
    name,
    label,
    value,
    inputProps,
    error,
    handleChange,
    inputValidation,
    containerStyle,
  } = props;

  return (
    <View style={StyleSheet.flatten([styles.container, containerStyle])}>
      <Input
        placeholder={label}
        value={value}
        onEndEditing={(event) => {
          inputValidation && inputValidation(name, value);
        }}
        onChange={(event) => {
          handleChange(name, event.nativeEvent.text);
          inputValidation && inputValidation(name, event.nativeEvent.text);
        }}
        style={StyleSheet.flatten([
          styles.input,
          { borderBottomColor: error && colors.orange },
        ])}
        returnKeyType="done"
        {...inputProps}
      />
      {error && <TextField style={styles.errorMessage}>{error}</TextField>}
    </View>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    alignSelf: "flex-start",
    marginLeft: 10,
    marginTop: 7,
    marginBottom: -9,
    color: colors.orange,
    fontSize: isWeb ? 13 : 19,
    fontWeight: "400",
  },
  container: {
    marginBottom: 19,
    width: "87%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 47,
    alignSelf: "stretch",
    fontWeight: "500",
  },
});

export default FormField;
