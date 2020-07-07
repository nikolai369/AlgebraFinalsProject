import React from "react";

import Input from "./Input";
import { View, Platform } from "react-native";
import { Feather } from "@expo/vector-icons";

const isWeb = Platform.OS === 'web';

const SearchBar = (props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        margin: 10,
        justifyContent: "center",
        alignItems: "center",
        width: isWeb ? '35%' : "70%",
      }}
    >
      <Input
        placeholder="Search"
        onChange={props.onChange}
        style={{  width: "100%" }}
      />
      {/* <Feather name="search" size={20} color="green" onPress={props.onPress} /> */}
    </View>
  );
};

export default SearchBar;
