import React from "react";
import { StyleSheet, FlatList } from "react-native";

import Center from "./Center";
import SearchBar from "./SearchBar";

const ListView = (props) => {
  const [onPress, onChange] = [props];
  delete props.onPress;
  delete props.onChange;

  return (
    <Center>
      <SearchBar onChange={onChange} onPress={() => {}} />
      <FlatList
        {...props}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        style={{
        width: "100%",
         }}
      />
    </Center>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "stretch",
    width: "100%",
    height: "100%",
  },
});

export default ListView;
