import React from "react";
import { StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";

import { createStackNavigator } from "@react-navigation/stack";
import { HistoryFeedScreen } from "../screens/HistoryFeedScreen";
import colors from "../constants/colors";

const Stack = createStackNavigator();

export const HistoryFeedStack = (props) => {
  return (
    <Stack.Navigator initialRouteName="History">
      <Stack.Screen
        name="History"
        options={{
          headerTitle: "Attended events",
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
        component={HistoryFeedScreen}
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
