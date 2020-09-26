import React from "react";
import { StyleSheet } from "react-native";
import MapView from "react-native-maps";

const Map = (props) => {
  <MapView style={styles.mapView}>{props.children}</MapView>;
};

const styles = StyleSheet.create({
  mapView: {
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    width: "90%",
    height: 100,
  },
});

export default Map;
