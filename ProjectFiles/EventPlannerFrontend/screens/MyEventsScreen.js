import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import faker from "faker";

import EventItem from "../components/EventItem";
import ListView from "../components/ListView";

export const MyEventsScreen = (props) => {
  useEffect(() => {}, []);

  return (
    <ListView
      data={Array.from(Array(10), () => faker.commerce.product())}
      keyExtractor={(product, idx) => product + idx}
      renderItem={(item) => <EventItem title={item.product} />}
    />
  );
};

const styles = StyleSheet.create({});
