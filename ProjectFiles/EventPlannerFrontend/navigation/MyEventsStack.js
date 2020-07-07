import React from "react";
import { StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";

import { createStackNavigator } from "@react-navigation/stack";
import { MyEventsScreen } from "../screens/MyEventsScreen";
import colors from "../constants/colors";

const Stack = createStackNavigator();

export const MyEventsStack = (props) => {
  return (
    <Stack.Navigator initialRouteName="MyEvents">
      <Stack.Screen
        name="MyEvents"
        options={{
          headerTitle: "Your events",
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
        component={MyEventsScreen}
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
