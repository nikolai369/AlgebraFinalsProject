import React from "react";
import { TouchableOpacity, StyleSheet, Platform, View } from "react-native";

import Card from "./Card";
import TextField from "./TextField";

const isWeb = Platform.OS === "web";

const EventItem = (props) => {
  const { title, duration, description, onPress } = props;

  return (
    <TouchableOpacity style={styles.touchable} onPress={onPress}>
      <Card style={styles.card}>
        <TextField style={styles.title}>{title}</TextField>
        <TextField style={styles.duration}>{duration}</TextField>
        <TextField style={styles.description}>{description}</TextField>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    margin: 10,
    width: 300,
    height: isWeb ? 300 : 150,
  },
  card: {
    flex: 1,
    backgroundColor: "#333",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  duration: {
    fontSize: 15,
    fontWeight: "500",
  },
  description: {
    fontSize: 15,
    fontWeight: "500",
  },
});

export default EventItem;
