import { useState, useEffect, useRef, useCallback } from "react";
import { Linking, Platform, AppState } from "react-native";
import * as Location from "expo-location";
import * as IntentLauncherAndroid from "expo-intent-launcher";
import { useNavigation } from "@react-navigation/native";

export const useLocation = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [showEnableLocation, setShowEnableLocation] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigation = useNavigation();
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const unsubscribeNavigationFocus = navigation.addListener(
      "focus",
      getLocation
    );
    AppState.addEventListener("change", handleAppStateChange);
    // getLocation();

    return () => {
      AppState.removeEventListener("change", handleAppStateChange);
      unsubscribeNavigationFocus();
    };
  }, []);

  const openSettings = () => {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
    }
    if (Platform.OS === "android") {
      IntentLauncherAndroid.startActivityAsync(
        IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS
      );
    }
    setShowEnableLocation(() => false);
  };

  const handleAppStateChange = useCallback((nextAppState) => {
    console.log("handleAppStateChange");
    if (
      appState.current.match(/background|inactive/) &&
      nextAppState === "active"
    ) {
      getLocation();
    }
    appState.current = nextAppState;
  });

  const getLocation = async () => {
    try {
      let { status } = await Location.requestPermissionsAsync();
      console.log(status);
      if (status !== "granted") {
        setErrorMsg("Please enable location permisions for this app...");
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      });

      console.log("loc: ", location);
      setCurrentLocation(() => location.coords);
    } catch (error) {
      console.log(error);

      console.log("status: ", status);
      if (!status.locationServicesEnabled) {
        setShowEnableLocation(() => true);
      }
    }
  };

  return {
    currentLocation,
    showEnableLocation,
    setShowEnableLocation,
    openSettings,
    errorMsg,
  };
};
