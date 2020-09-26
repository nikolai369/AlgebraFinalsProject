import React, { createContext, useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";

export const AppContext = createContext({});

export const AppProvider = (props) => {
  const [user, setUser] = useState({});

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        login: async (formData) => {
          //API call
          console.log("API call start");
          console.log(formData);

          try {
            const response = await fetch(
              "http://eaeb934e8274.ngrok.io/api/user/login",
              {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify(formData),
              }
            );

            const json = await response.json();

            if (json.is_valid_login) {
              return "Wrong username or password";
            }

            console.log(json);
            AsyncStorage.setItem("user", JSON.stringify(formData));
            setUser(() => json);
          } catch (error) {
            console.error(error);
          }

          console.log("API call end");
        },
        logout: () => {
          AsyncStorage.removeItem("user");
          setUser(null);
        },

        register: async (formData) => {
          try {
            let response = await fetch(
              "http://eaeb934e8274.ngrok.io/api/user/register",
              {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify(formData),
              }
            );

            let json = await response.json();
            setUser(json);
          } catch (error) {
            console.error(error);
          }
        },
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
