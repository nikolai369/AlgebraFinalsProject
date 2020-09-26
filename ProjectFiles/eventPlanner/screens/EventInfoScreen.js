import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Platform, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { AppContext } from "../providers/AppProvider";
import { useForm } from "../hooks/useForm";
import { eventFormValidation } from "../validation/eventFormValidation";
import FormField from "../components/FormField";
import Loading from "../components/Loading";
import Autosuggest from "../components/Autosuggest";
import Button from "../components/Button";
import DateTime from "../components/DateTime";
import TextField from "../components/TextField";
import FormContainer from "../components/FormContainer";
import DismissKeyboard from "../components/DismissKeyboard";
import colors from "../constants/colors";

const isWeb = Platform.OS === "web";
const INITIAL_FORM_VALUES = {
  address: "",
  location: null,
  start: "",
  end: "",
  title: "",
};

const EventInfoForm = (props) => {
  const {
    user: { UserID },
  } = useContext(AppContext);

  const {
    params: { eventId, location, idUser },
  } = useRoute();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [isGoing, setIsGoing] = useState(false);
  const [goingStats, setGoingStats] = useState(0);
  const isHost = idUser === UserID;
  const [isEditable, setEditable] = useState(false);
  const {
    formValues,
    handleChange,
    handleSubmit,
    handleOnBlur,
    errors,
    submittable,
    setFormValues,
  } = useForm(INITIAL_FORM_VALUES, updateEvent, eventFormValidation);

  useEffect(() => {
    setLoading(true);
    fetchEvent();
  }, [eventId]);

  const fetchEvent = async () => {
    try {
      const response = await fetch(
        `http://eaeb934e8274.ngrok.io/api/event/idevent`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=utf-8",
          },
          body: JSON.stringify({ EventID: eventId, IDUser: UserID }),
        }
      );
      const json = await response.json();

      const {
        Adresse,
        Starting,
        Ending,
        Title,
        IsLoginUserGoing,
        NumberOfGoing,
        latitude,
        longitude,
      } = json;
      navigation.setOptions({ headerTitle: Title });

      setIsGoing(IsLoginUserGoing);
      setGoingStats(NumberOfGoing);

      setFormValues({
        title: Title,
        address: Adresse,
        start: Starting,
        end: Ending,
        location: { latitude, longitude },
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  async function updateEvent() {
    setLoading(() => true);

    const { location, start, end, title, address } = formValues;
    try {
      await fetch("http://eaeb934e8274.ngrok.io/api/event/update", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          EventID: eventId,
          ...location,
          Adresse: address,
          Title: title,
          Starting: start,
          Ending: end,
        }),
      });
    } catch (error) {
      console.error(error);
    }
    await fetchEvent();
    setEditable(false);
  }

  const deleteEvent = async () => {
    setLoading(() => true);
    try {
      await fetch("http://eaeb934e8274.ngrok.io/api/event/delete", {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({ EventID: eventId }),
      });

      navigation.navigate("Feed");
    } catch (error) {
      console.error(error);
    }
  };

  const onGoingToggle = async () => {
    try {
      await fetch("http://eaeb934e8274.ngrok.io/api/going/is_going", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({ IDUser: UserID, IDEvent: eventId }),
      });
      isGoing ? setGoingStats(goingStats - 1) : setGoingStats(goingStats + 1);
      setIsGoing(() => !isGoing);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSetLocation = (location, address) => {
    setFormValues(() => ({
      ...formValues,
      ["address"]: address,
      ["location"]: location,
    }));
  };

  const formatDate = (dateISO) => {
    return new Date(dateISO).toLocaleString("hr").slice(0, -3);
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <FormContainer>
      {isEditable && (
        <FormField
          label="Title"
          name="title"
          value={formValues.title}
          error={errors.title}
          handleChange={handleChange}
          handleOnBlur={handleOnBlur}
        />
      )}
      {isEditable ? (
        <DateTime
          label="Starts"
          name="start"
          value={formValues.start}
          error={errors.start}
          handleChange={handleChange}
        />
      ) : (
        <FormField
          label="Starts"
          name="start"
          value={formatDate(formValues.start)}
        />
      )}
      {isEditable ? (
        <DateTime
          label="Ends"
          name="end"
          minimumDate={new Date(formValues.start)}
          value={formValues.end}
          handleChange={handleChange}
        />
      ) : (
        <FormField label="Ends" name="end" value={formatDate(formValues.end)} />
      )}
      <Autosuggest
        value={formValues.address}
        location={location}
        handleChange={handleChange}
        error={errors.location}
        setLocation={handleSetLocation}
      />
      <TextField style={styles.goingStats}>
        People going: {goingStats}
      </TextField>
      {isEditable && (
        <>
          <Button
            title="Update"
            boxStyle={styles.goingUpdateBox}
            disabled={!submittable}
            onPress={() => {
              handleSubmit();
            }}
          />
          <Button
            title="Delete"
            boxStyle={styles.editCancleBuyBox}
            onPress={() => {
              deleteEvent();
            }}
          />
        </>
      )}
      {!isEditable && (
        <Button
          title={isGoing ? "Cancle Arrival" : "Going"}
          boxStyle={StyleSheet.flatten([
            styles.goingUpdateBox,
            { backgroundColor: isGoing ? colors.magenta : colors.orange },
          ])}
          onPress={onGoingToggle}
        />
      )}
      {isHost && (
        <Button
          boxStyle={styles.editCancleBuyBox}
          title={isEditable ? "Cancle" : "Edit"}
          onPress={() => setEditable(() => !isEditable)}
        />
      )}
    </FormContainer>
  );
};

export const EventInfoScreen = (props) => {
  return (
    <DismissKeyboard>
      <EventInfoForm />
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  goingUpdateBox: {
    marginBottom: 19,
  },
  goingStats: {
    marginBottom: 19,
    letterSpacing: 1,
    fontWeight: "600",
  },
  editCancleBuyBox: {
    backgroundColor: colors.magenta,
    marginBottom: 19,
  },
});

export default EventInfoScreen;
