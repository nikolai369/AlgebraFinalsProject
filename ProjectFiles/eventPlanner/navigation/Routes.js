import React, { useContext, useState, useEffect } from "react";
import { Platform } from "react-native";

import { AppContext } from "../providers/AppProvider";
import { NavigationContainer } from "@react-navigation/native";
import { AuthStack } from "./AuthStack";
import AppTabs from "./AppTabs";
import AppDrawer from "./AppDrawer";
import AsyncStorage from "@react-native-community/async-storage";
import Loading from "../components/Loading";

const isWeb = Platform.OS === "web";

export const Routes = (props) => {
  const { user, login } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(() => true);
    //check if the user is logged in or not
    AsyncStorage.getItem("user")
      .then((userString) => {
        if (userString) {
          console.log("userString: ", userString);
          console.log(JSON.parse(userString));
          const { email, password } = JSON.parse(userString);
          login({ email, password });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(() => false);
  }, []);

  if (user) {
    return (
      <NavigationContainer>
        {isWeb ? <AppDrawer /> : <AppTabs />}
      </NavigationContainer>
    );
  }
  if (loading) {
    return <Loading />;
  } else {
    return (
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    );
  }
};
