import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";

import { Home, CreateEvent, Profile } from "../components/HeaderStacks";
import Test from "../screens/Test";

const Tab = createBottomTabNavigator();

const AppTabs = (props) => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: styles.tab,
        labelPosition: "below-icon",
        activeTintColor: "#fff",
        inactiveTintColor: "#999",
        labelStyle: styles.label,
      }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="CreateEvent"
        options={{
          tabBarLabel: "Create Event",
          tabBarIcon: ({ color }) => (
            <Entypo name="squared-plus" size={23} color={color} />
          ),
        }}
        component={CreateEvent}
      ></Tab.Screen>
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={20} color={color} />
          ),
        }}
        component={Home}
      ></Tab.Screen>
      <Tab.Screen
        name="Profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <Entypo name="user" size={20} color={color} />
          ),
        }}
        component={Profile}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tab: {
    backgroundColor: "#333",
    borderTopColor: "#444",
  },
  label: {
    fontWeight: "700",
    fontSize: 13,
  },
});

export default AppTabs;
