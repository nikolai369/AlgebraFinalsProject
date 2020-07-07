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
    shadowColor: colors.darkGreen,
    shadowOffset: {
      height: 2,
      width: 4,
    },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    padding: 15,
    borderRadius: 10,
    elevation: 8,
    backgroundColor: "white",
  },
});

export default Card;
