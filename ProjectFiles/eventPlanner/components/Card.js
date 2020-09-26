import React from "react";
import { View, StyleSheet } from "react-native";

import colors from "../constants/colors";

const Card = (props) => {
  return (
    <View style={StyleSheet.flatten([styles.card, props.style])}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",
    shadowRadius: 9,
    shadowOpacity: 0.66,
    shadowColor: "#111",
    padding: 15,
    borderRadius: 7,
    elevation: 7,
    backgroundColor: colors.black,
  },
});

export default Card;
