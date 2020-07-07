import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";

import { createStackNavigator } from "@react-navigation/stack";
import { EventFeedScreen } from "../screens/EventFeedScreen";
import SearchBar from "../components/SearchBar";
import colors from "../constants/colors";

const Stack = createStackNavigator();

export const EventFeedStack = (props) => {
  return (
    <Stack.Navigator initialRouteName="Events">
      <Stack.Screen
        name="Events"
        options={{
          headerTitle: "Current events near you",
          headerTitleStyle: styles.headerTitleStyle,
          headerStyle: styles.headerStyle,
          headerLeft: () => (
            <Entypo
              name="menu"
              style={{ marginLeft: 15 }}
              size={20}
              color="white"
              onPress={() => props.navigation.toggleDrawer()}
            />
          ),
        }}
        component={EventFeedScreen}
      ></Stack.Screen>
      <Stack.Screen name="EventInfo" component={() => {}}></Stack.Screen>
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerTitleStyle: {
    color: "white",
    fontWeight: "bold",
  },
  headerStyle: {
    backgroundColor: colors.darkGreen + "75",
  },
});
