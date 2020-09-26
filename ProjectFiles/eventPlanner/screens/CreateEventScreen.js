import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Modal, Platform } from "react-native";

import { AppContext } from "../providers/AppProvider";
import { useLocation } from "../hooks/useLocation";
import { useForm } from "../hooks/useForm";
import { eventFormValidation } from "../validation/eventFormValidation";
import { useNavigation } from "@react-navigation/native";
import DismissKeyboard from "../components/DismissKeyboard";
import DateTime from "../components/DateTime";
import FormContainer from "../components/FormContainer";
import Autosuggest from "../components/Autosuggest";
import FormField from "../components/FormField";
import Loading from "../components/Loading";
import Button from "../components/Button";
import Card from "../components/Card";
import Center from "../components/Center";
import TextField from "../components/TextField";

const isWeb = Platform.OS === "web";
const TRY_AGAIN = "Oops, something went wrong... Try again";
const SUCCESS = "Event created successfuly";
const INITIAL_STATE = {
  address: "",
  start: "",
  end: "",
  location: null,
  title: "",
};

const CreateEventForm = (props) => {
  const {
    user: { UserID },
  } = useContext(AppContext);

  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const {
    showEnableLocation,
    setShowEnableLocation,
    openSettings,
    errorMsg,
    currentLocation,
  } = useLocation();
  const {
    formValues,
    handleChange,
    errors,
    handleSubmit,
    setFormValues,
  } = useForm(INITIAL_STATE, onCreate, eventFormValidation);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      message && setFormValues(INITIAL_STATE);
      setMessage(null);
    });

    return unsubscribe;
  }, []);

  async function onCreate() {
    const { start, end, title, address, location } = formValues;
    try {
      setLoading(() => true);
      await fetch("http://eaeb934e8274.ngrok.io/api/event/create", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          Adresse: address,
          Title: title,
          Ending: end,
          Starting: start,
          IDUser: UserID,
          ...location,
        }),
      });

      console.log(formValues);

      setLoading(() => false);
      setFormValues(INITIAL_STATE);
      setMessage(SUCCESS);
    } catch (error) {
      console.error(error);
      setMessage(TRY_AGAIN);
    }
  }

  const handleSetLocation = (location, address) => {
    setFormValues(() => ({
      ...formValues,
      ["address"]: address,
      ["location"]: location,
    }));
  };

  if (errorMsg || message) {
    return (
      <Center>
        <TextField style={styles.permissionError}>
          {errorMsg ? errorMsg : message}
          {message && (
            <Button
              onPress={() => setMessage(null)}
              title={message === TRY_AGAIN ? "Try Again" : " Add More"}
            />
          )}
        </TextField>
      </Center>
    );
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <FormContainer>
      {!isWeb && (
        <Modal
          style={{ flex: 1, backgroundColor: "#222" }}
          visible={showEnableLocation}
        >
          <Card>
            <Button
              title="Enable location"
              onPress={() => {
                setShowEnableLocation(() => false);
                openSettings();
              }}
            />
          </Card>
        </Modal>
      )}
      <FormField
        label="Title"
        name="title"
        value={formValues.title}
        error={errors.title}
        handleChange={handleChange}
      />
      <DateTime
        label="Starts"
        name="start"
        error={errors.start}
        value={formValues.start}
        handleChange={handleChange}
      />
      <DateTime
        label="Ends"
        name="end"
        error={errors.end}
        minimumDate={new Date(formValues.start)}
        value={formValues.end}
        handleChange={handleChange}
      />
      {/* <View
        style={{
          width: "87%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <FormField
          label="Ticket price"
          name="ticket"
          value={formValues.ticket}
          handleChange={handleChange}
          containerStyle={{ justifyContent: "flex-start", width: "77%" }}
          inputProps={{
            keyBoardType: "numeric",
          }}
        />
        <TextField style={{ marginBottom: 19 }}>HRK</TextField>
      </View> */}
      <Autosuggest
        value={formValues.address}
        location={currentLocation}
        handleChange={handleChange}
        error={errors.location}
        setLocation={handleSetLocation}
      />
      <Button title="Create" onPress={handleSubmit} />
    </FormContainer>
  );
};

export const CreateEventScreen = (props) => {
  return (
    <DismissKeyboard>
      <CreateEventForm />
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  enableButtonTitle: {
    fontSize: 15,
    letterSpacing: 0,
  },
  permissionError: {
    color: "white",
    textAlign: "center",
  },
});

export default CreateEventScreen;
