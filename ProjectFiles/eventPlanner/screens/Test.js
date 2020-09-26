import React from "react";
import { TextInput, View, StyleSheet } from "react-native";

import Center from "../components/Center";
import DateTime from "../components/DateTime";

const Test = (props) => {
  return (
    <View
      style={{
        backgroundColor: "grey",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TextInput style={{ width: "87%" }} />
      <DateTime />
    </View>
  );
};

const styles = StyleSheet;
export default Test;
