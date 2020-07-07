import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { LoginScreen } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import colors from "../constants/colors";
import { StyleSheet } from "react-native";

const Stack = createStackNavigator();
const INITIAL_ROUTE_NAME = "SignIn";

export const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <Stack.Screen
        options={{
          headerTitle: "Sign in",
          headerTitleStyle: styles.headerTitleStyle,
          headerStyle: styles.headerStyle,
        }}
        name="SignIn"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{
          headerTitle: "Sign up",
          headerTitleStyle: styles.headerTitleStyle,
          headerStyle: styles.headerStyle,
          headerLeft: null,
        }}
        name="SignUp"
        component={RegisterScreen}
      />
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
