import React, { useContext, useEffect, useState } from "react";
import { Platform, Modal, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { NEARBY, GOING, MYEVENTS } from "../components/NavigationHeader";
import { useLocation } from "../hooks/useLocation";
import ListView from "../components/ListView";
import EventItem from "../components/EventItem";
import Loading from "../components/Loading";
import Center from "../components/Center";
import Card from "../components/Card";
import Button from "../components/Button";
import TextField from "../components/TextField";
import { AppContext } from "../providers/AppProvider";

const isWeb = Platform.OS === "web";

const FeedScreen = (props) => {
  const {
    user: { UserID },
  } = useContext(AppContext);

  const {
    params: { sortOption },
  } = useRoute();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState(null);
  const [message, setMessage] = useState(null);
  const {
    currentLocation,
    showEnableLocation,
    setShowEnableLocation,
    openSettings,
    errorMsg,
  } = useLocation();

  const handleMessage = (data) => {
    if (data && !data.length) {
      switch (sortOption) {
        case NEARBY:
          return "Sorry, there are no events in your area...";
        case MYEVENTS:
          return "You have no events...";
        case GOING:
          return "You are not going to any events...";
        default:
          break;
      }
    }
  };

  const fetchData = async (url, requestOptions) => {
    try {
      const response = await fetch(url, requestOptions);

      const data = await response.json();
      console.log("data: ", data);

      setMessage(handleMessage(data));
      setEvents(() => data);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(() => false);
  };

  const handleOnPress = (params) => {
    navigation.navigate({
      name: "Event",
      params: params,
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () =>
      setIsLoading(() => true)
    );

    return unsubscribe;
  }, []);

  useEffect(() => {
    setIsLoading(() => true);

    if (currentLocation) {
      switch (sortOption) {
        case NEARBY:
          fetchData("http://eaeb934e8274.ngrok.io/api/event/near_me", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(currentLocation),
          });
          break;
        case GOING:
          fetchData(`http://eaeb934e8274.ngrok.io/api/going/?id=${UserID}`, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json; charset=utf-8",
            },
          });
          break;
        case MYEVENTS:
          fetchData(`http://eaeb934e8274.ngrok.io/api/event/?id=${UserID}`, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json; charset=utf-8",
            },
          });
          console.log("MYEVENTS");
          break;
        default:
          break;
      }
    }
  }, [sortOption, currentLocation]);

  if (isLoading) {
    return <Loading />;
  }

  if (message) {
    return (
      <Center>
        <TextField>{message}</TextField>
      </Center>
    );
  }

  if (errorMsg) {
    return (
      <Center>
        <TextField style={styles.permissionError}>{errorMsg}</TextField>
      </Center>
    );
  }

  return (
    <ListView
      data={events}
      keyExtractor={(item) => item.EventID.toString()}
      renderItem={(event) => (
        <EventItem
          title={event.item.Title}
          description={event.item.Adresse}
          onPress={handleOnPress.bind(this, {
            eventId: event.item.EventID,
            location: currentLocation,
            idUser: event.item.IDUser,
          })}
        />
      )}
    >
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
    </ListView>
  );
};

const styles = StyleSheet.create({
  permissionError: {
    color: "white",
  },
});

export default FeedScreen;

// export const NearbyEventsFeed = (props) => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const navigation = useNavigation();

//   const handleOnPress = (params) => {
//     navigation.navigate({
//       name: "EventInfo",
//       params: params,
//       key: "EventInfo-EFS",
//     });
//   };

//   // useEffect(() => {
//   //   setLoading(true);
//   //   const fetchData = async () => {
//   //     try {
//   //       const response = await fetch(
//   //         "http://5db6a057f6d5.ngrok.io/api/event/all"
//   //       );

//   //       const json = await response.json();
//   //       const events = json.map((item) => item);

//   //       setEvents(events);
//   //     } catch (error) {
//   //       console.error(error);
//   //     }
//   //     setLoading(false);
//   //   };

//   //   const unsubscribe = navigation.addListener("focus", () => {
//   //     fetchData();
//   //     console.log("focus");
//   //   });

//   //   fetchData();

//   //   return unsubscribe();
//   // }, []);

//   if (loading) {
//     return <Loading />;
//   }

//   return (
//     <ListView
//       data={events}
//       keyExtractor={(item) => item.EventID.toString()}
//       renderItem={(event) => (
//         <EventItem
//           title={event.item.Title}
//           description={event.item.Info}
//           duration={event.item.Duration}
//           onPress={handleOnPress.bind(this, event.item.EventID)}
//         />
//       )}
//     />
//   );
// };
