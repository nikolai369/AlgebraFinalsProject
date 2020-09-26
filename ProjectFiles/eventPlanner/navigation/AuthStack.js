import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import { LoginScreen } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";

const Stack = createStackNavigator();
const INITIAL_ROUTE_NAME = "SignIn";

export const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <Stack.Screen
        options={{
          headerTitle: "Event Planner",
          headerTitleStyle: styles.headerTitle,
          headerStyle: styles.header,
          headerLeft: null,
        }}
        name="login"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{
          headerTitle: "Register your account",
          headerTitleStyle: styles.headerTitle,
          headerStyle: styles.header,
          headerLeft: null,
        }}
        name="register"
        component={RegisterScreen}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#333",
    borderStyle: "solid",
    borderBottomWidth: 1.66,
    borderBottomColor: "#444",
  },
  headerTitle: {
    color: "#eee",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 30,
  },
});
