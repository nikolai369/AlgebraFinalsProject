import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { EventsDrawer } from "./EventsDrawer";
import { CreateEventScreen } from "../screens/CreateEventScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import colors from "../constants/colors";

const Tab = createBottomTabNavigator();

export const AppTabs = (props) => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: { backgroundColor: colors.darkGreen + "75" },
        activeTintColor: "white",
        inactiveTintColor: colors.darkGreen,
        activeBackgroundColor: colors.yellow + '50'
      }}
      initialRouteName="Home"
    >
      <Tab.Screen name="CreateEvent" component={CreateEventScreen}></Tab.Screen>
      <Tab.Screen name="Home" component={EventsDrawer}></Tab.Screen>
      <Tab.Screen name="Profile" component={ProfileScreen}></Tab.Screen>
    </Tab.Navigator>
  );
};
