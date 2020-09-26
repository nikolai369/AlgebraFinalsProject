import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { TouchableOpacity } from "react-native";

import TextField from "./TextField";

const isIos = Platform.OS === "ios";

export const NEARBY = 1;
export const GOING = 2;
export const MYEVENTS = 3;

const NavigationButton = (props) => {
  const { title, onPress, activeStyle } = props;

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={StyleSheet.flatten([styles.navigationButton, activeStyle])}
      onPress={onPress}
    >
      <View>
        <TextField style={styles.navigationText}>{title}</TextField>
      </View>
    </TouchableOpacity>
  );
};

const NavigationHeader = (props) => {
  const {
    initialParams: { sortOption },
  } = props;
  const [chosenParameter, setChosenParameter] = useState(sortOption);
  const navigation = useNavigation();

  const navigationHandler = (param) => {
    console.log(param);
    navigation.navigate({
      name: "Feed",
      params: { sortOption: param },
    });
  };

  const onPressHandler = (option) => {
    setChosenParameter(() => option);
    navigationHandler(option);
  };

  return (
    <>
      <NavigationButton
        title="Nearby"
        activeStyle={
          chosenParameter === NEARBY && styles.navigationButtonActive
        }
        onPress={() => {
          onPressHandler(NEARBY);
        }}
      />
      <NavigationButton
        title="Going"
        activeStyle={chosenParameter === GOING && styles.navigationButtonActive}
        onPress={() => {
          onPressHandler(GOING);
        }}
      />
      <NavigationButton
        title="MyEvents"
        activeStyle={
          chosenParameter === MYEVENTS && styles.navigationButtonActive
        }
        onPress={() => {
          onPressHandler(MYEVENTS);
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "87%",
  },
  navigationButton: {
    padding: 7,
    justifyContent: "center",
    width: "23%",
    height: isIos ? "77%" : "66%",
    borderRadius: 5,
  },
  navigationButtonActive: {
    backgroundColor: "#555",
  },

  navigationText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: 0,
  },
});

export default NavigationHeader;
