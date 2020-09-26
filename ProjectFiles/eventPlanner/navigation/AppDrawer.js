import React from "react";
import { StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { Home, CreateEvent, Profile } from "../components/HeaderStacks";

const Drawer = createDrawerNavigator();

const AppDrawer = (props) => {
  return (
    <Drawer.Navigator
      drawerStyle={styles.drawer}
      drawerContentOptions={{
        labelStyle: { fontSize: 17, fontWeight: "700" },
        activeTintColor: "#fff",
        inactiveTintColor: "#999",
      }}
      drawerType="permanent"
      initialRouteName="Home"
    >
      <Drawer.Screen name="Home" component={Home}></Drawer.Screen>
      <Drawer.Screen name="CreateEvent" component={CreateEvent}></Drawer.Screen>
      <Drawer.Screen name="Profile" component={Profile}></Drawer.Screen>
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: "#333",
    borderRightColor: "#444",
    width: "15%",
  },
  label: {
    fontWeight: "700",
    fontSize: 13,
  },
});

export default AppDrawer;
