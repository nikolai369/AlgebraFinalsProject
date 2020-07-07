import React, { createContext, useState } from "react";
import { AsyncStorage } from "react-native";

export const AuthContext = createContext({});

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        login: (auth) => {
          //API call
          console.log("API call start");
          console.log(auth)
          try {
            let response =  fetch(
              "http://localhost:57871/api/user/login",
              {
                method: "POST",
                mode: "no-cors",
                headers: {
                  Accept: "application/x-www-form-urlencoded",
                  "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
                  
                },
                body: JSON.stringify(auth)
              }
            );

            console.log(response);
            setUser(response);

            AsyncStorage.setItem("user", JSON.stringify(user));

          } catch (error) {
            console.error(error);
            return error;  
          }

          console.log("API call end");
        },
        logout: () => {
          AsyncStorage.removeItem("user", "");
          setUser(null);
        },
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};