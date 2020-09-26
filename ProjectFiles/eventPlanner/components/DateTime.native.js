import React, { useCallback, useState } from "react";

import { Platform, StyleSheet, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Input from "./Input";
import TextField from "./TextField";
import colors from "../constants/colors";

const DATE = "date";
const TIME = "time";
const isWeb = Platform.OS === "web";
const OPTIONS = {
  day: "numeric",
  month: "numeric",
  year: "numeric",
};

const DateTime = (props) => {
  const {
    name,
    value,
    error,
    handleChange,
    label,
    minimumDate,
    editable,
  } = props;

  const [mode, setMode] = useState(DATE);
  const [show, setShow] = useState(false);

  const showDatePicker = () => {
    setMode(DATE);
    setShow(true);
  };

  const showTimePicker = () => {
    setMode(TIME);
    setShow(true);
  };

  const hidePicker = () => {
    setShow(false);
  };

  new Date().toISOString;

  const handleConfirm = (date) => {
    console.log("==================");
    let buildISO = "";

    if (mode === DATE) {
      console.log("date:", date);
      buildISO = date.toISOString();
    } else {
      console.log("date:", date);
      console.log("val split: ", value.split("T")[0]);

      buildISO = `${value.split("T")[0]}T${date.toISOString().split("T")[1]}`;
    }

    handleChange(name, buildISO);
    hidePicker();
  };

  return (
    <>
      <View style={styles.container}>
        <Input
          value={value && new Date(value).toLocaleString("hr").slice(0, -3)}
          placeholder={label}
          style={styles.input}
        />
        <Entypo
          name="calendar"
          color="white"
          size={23}
          onPress={showDatePicker}
          disabled={true}
        />
        <Entypo
          name="stopwatch"
          color="white"
          size={23}
          onPress={showTimePicker}
          disabled={true}
        />
      </View>
      {error && <TextField style={styles.errorMessage}>{error}</TextField>}
      <DateTimePickerModal
        date={minimumDate ? minimumDate : new Date()}
        minimumDate={minimumDate ? minimumDate : new Date()}
        locale="hr-HR"
        is24Hour={true}
        isVisible={show}
        mode={mode}
        onConfirm={handleConfirm}
        onCancel={hidePicker}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "87%",
    marginBottom: 19,
  },
  input: {
    width: "77%",
    height: 47,
  },
  errorMessage: {
    alignSelf: "flex-start",
    marginLeft: 10,
    marginBottom: 7,
    marginTop: -17,
    color: colors.orange,
    fontSize: isWeb ? 13 : 19,
    fontWeight: "400",
  },
});

export default DateTime;
