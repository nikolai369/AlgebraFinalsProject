import React from "react";
import { StyleSheet, FlatList, Platform } from "react-native";

import Center from "./Center";

const isWeb = Platform.OS === "web";

const ListView = (props) => {
  const { children } = props;
  return (
    <Center>
      <FlatList
        {...props}
        numColumns={isWeb ? 3 : 1}
        contentContainerStyle={styles.contentContainer}
        columnWrapperStyle={
          isWeb && { flexWrap: "wrap", alignItems: "flex-start" }
        }
        style={styles.list}
      />
      {children}
    </Center>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    width: "100%",
  },
});

export default ListView;
