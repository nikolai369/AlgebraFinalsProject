import React, { createContext, useState } from "react";
import { AsyncStorage } from "react-native";

export const RegisterContext = createContext({});

export const RegisterProvider = (props) => {
  return (
    <RegisterContext.Provider
      value={{
        register: (auth) => {
          //API call
          console.log("API call start");
          console.log(auth)
          try {
            let response =  fetch(
              "http://localhost:57871/api/user/register",
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

          } catch (error) {
            console.error(error);
            return error;  
          }

          console.log("API call end");
        },
      }}
    >
      {props.children}
    </RegisterContext.Provider>
  );
};