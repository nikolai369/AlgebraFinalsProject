import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { EventFeedStack } from "./EventFeedStack";
import { HistoryFeedStack } from "./HistoryFeedStack";
import { MyEventsStack } from "./MyEventsStack";
import colors from "../constants/colors";

const Drawer = createDrawerNavigator();

export const EventsDrawer = (props) => {
  return (
    <Drawer.Navigator
      drawerStyle={{ backgroundColor: colors.yellow + '90' }}
      drawerContentOptions={{
        activeBackgroundColor: colors.lightGreen + '70',
        activeTintColor: 'white',
        inactiveTintColor: colors.darkGreen
      }}
      initialRouteName="Feed"
    >
      <Drawer.Screen name="Feed" component={EventFeedStack}></Drawer.Screen>
      <Drawer.Screen
        name="History"
        component={HistoryFeedStack}
      ></Drawer.Screen>
      <Drawer.Screen name="MyEvents" component={MyEventsStack}></Drawer.Screen>
    </Drawer.Navigator>
  );
};
