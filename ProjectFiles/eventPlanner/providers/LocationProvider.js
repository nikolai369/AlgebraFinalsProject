import React, { createContext, useState } from "react";
import * as Location from "expo-location";

export const LocationContext = createContext({});

export const LocationProvider = (props) => {
  const [location, setLocation] = useState(null);
  const [showEnableLocation, setShowEnableLocation] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  return (
    <LocationContext.Provider
      values={{
        location,
        showEnableLocation,
        errorMsg,
        getLocation: async () => {
          try {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== "granted") {
              setErrorMsg("Permission to access location was denied");
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
          } catch (error) {
            const status = Location.getProviderStatusAsync();
            if (!(await status).locationServicesEnabled) {
              setShowEnableLocation(true);
            }
          }
        },
      }}
    >
      {props.children}
    </LocationContext.Provider>
  );
};
