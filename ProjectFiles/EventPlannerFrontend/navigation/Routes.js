import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useContext, useState } from "react";

import { AsyncStorage, ActivityIndicator, Platform } from "react-native";
import { AuthContext } from "../providers/AuthProvider";
import Center from "../components/Center";
import LinkingConfiguration from "./LinkingConfiguration";
import { AuthStack } from "./AuthStack";
import { AppTabs } from "./AppTabs";

const isWeb = Platform.OS === "web";
//const linkingConfiguration = isWeb ? LinkingConfiguration : null;

export const Routes = (props) => {
  const { user, login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   //check if the user is logged in or not
  //   // AsyncStorage.getItem("user")
  //   // .then(userString => {
  //   //     if (userString) {
  //   //         setLoading(false)
  //   //     } else {
  //   //         setLoading(true);
  //   //     }
  //   // }).catch(err => {
  //   //     console.log(err);
  //   //     setLoading(true);
  //   // });
  // }, []);

  if (loading) {
    return (
      <Center>
        <ActivityIndicator size="large" />
      </Center>
    );
  }

  return (
    <NavigationContainer linking={LinkingConfiguration}>
      {user ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};
