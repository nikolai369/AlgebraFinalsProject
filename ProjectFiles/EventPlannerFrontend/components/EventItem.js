import React from "react";
import { Text, TouchableOpacity, StyleSheet, Platform, View } from "react-native";

import Card from "./Card";
import TextField from "./TextField";

const isWeb = Platform.OS === 'web';

const EventItem = (props) => {
  return (
    <TouchableOpacity
      onPress={() => {}}
    >
      <Card style={styles.card}>
        <View style={styles.infoContainer}>
        <TextField>Title: </TextField>
        <TextField>Duration: </TextField>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 5,
    width: isWeb ? 500 : 300,
    height: 150,
    backgroundColor: "white",
    justifyContent: 'space-between'
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: "space-between"
  }
});

export default EventItem;
