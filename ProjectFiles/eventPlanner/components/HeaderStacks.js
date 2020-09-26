import React, { useContext } from "react";
import { Platform, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { AppContext } from "../providers/AppProvider";
import Feed from "../screens/FeedScreen";
import CreateEventScreen from "../screens/CreateEventScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Button from "./Button";
import NavigationHeader, { NEARBY } from "./NavigationHeader";
import colors from "../constants/colors";
import EventInfoScreen from "../screens/EventInfoScreen";

const isWeb = Platform.OS === "web";
const INITIAL_PARAM = { sortOption: NEARBY };
const Stack = createStackNavigator();

const HeaderStack = (props) => {
  const navigation = useNavigation();
  const {
    logoutButton,
    name,
    component,
    headerTitle,
    navComponent,
    initialParams,
  } = props;

  return (
    <Stack.Navigator initialRouteName={name}>
      <Stack.Screen
        initialParams={navComponent && initialParams}
        options={{
          headerTitle: headerTitle,
          headerTitleStyle: styles.headerTitle,
          headerStyle: styles.header,
          headerRightContainerStyle: styles.headerRight,
          headerRight: navComponent ? navComponent : logoutButton,
          headerLeft: null,
        }}
        name={name}
        component={component}
      ></Stack.Screen>
      {navComponent && (
        <Stack.Screen
          name="Event"
          component={EventInfoScreen}
          options={{
            headerTitle: "",
            headerTitleStyle: styles.headerTitle,
            headerStyle: styles.header,
            headerLeft: () => (
              <Entypo
                name="chevron-left"
                color="white"
                size={25}
                style={{ paddingLeft: 15 }}
                onPress={() => navigation.navigate(name)}
              />
            ),
          }}
        ></Stack.Screen>
      )}
    </Stack.Navigator>
  );
};

export const Home = () => {
  return (
    <HeaderStack
      name="Feed"
      initialParams={INITIAL_PARAM}
      headerTitle={null}
      component={Feed}
      navComponent={() => <NavigationHeader initialParams={INITIAL_PARAM} />}
    />
  );
};

export const Profile = () => {
  const { logout } = useContext(AppContext);

  return (
    <HeaderStack
      logoutButton={() => (
        <Button
          title="Log Out"
          onPress={logout}
          boxStyle={styles.buttonBox}
          titleStyle={styles.buttonTitle}
        />
      )}
      headerTitle="Your profile"
      name="Info"
      component={ProfileScreen}
    />
  );
};

export const CreateEvent = () => {
  return (
    <HeaderStack
      headerTitle="Create your event"
      name="Event"
      component={CreateEventScreen}
    />
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    color: "white",
    fontWeight: "bold",
  },
  header: {
    backgroundColor: "#333",
    borderBottomColor: "#444",
  },
  headerRight: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: isWeb ? "40%" : "99%",
    height: "100%",
    marginRight: 15,
  },
  buttonBox: {
    backgroundColor: colors.magenta,
    width: "26%",
    height: "66%",
  },
  buttonTitle: {
    fontSize: 17,
  },
});
