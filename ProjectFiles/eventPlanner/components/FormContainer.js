import React from "react";
import { StyleSheet, Platform } from "react-native";

import Center from "./Center";
import Card from "./Card";

const isWeb = Platform.OS === "web";

const FormContainer = (props) => {
  const { children } = props;

  return isWeb ? (
    <Center>
      <Card style={styles.card}>{children}</Card>
    </Center>
  ) : (
    <Center>{children}</Center>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: -20,
    paddingVertical: 37,
  },
});

export default FormContainer;
