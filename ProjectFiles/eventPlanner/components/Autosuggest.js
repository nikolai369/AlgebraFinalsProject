import React, {
  useState,
  useCallback,
  useEffect,
  useContext,
  useRef,
} from "react";
import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { debounce } from "lodash";

import Input from "./Input";
import TextField from "./TextField";
import colors from "../constants/colors";

const ADDRESS = "address";
const LOCATION = "location";
const isWeb = Platform.OS === "web";

const Autosuggest = (props) => {
  const { location, handleChange, editable, error, value, setLocation } = props;
  const [suggestions, setSuggestions] = useState([]);

  const handleSuggestData = (suggestion) => {
    const { address, resultType, position, mapView } = suggestion;
    const { lat, lng } = position;
    const { label } = address;

    if (resultType === "place") {
      const [place, address, cityPostal, country] = label.split(", ");
      // const [street, streetNumber] = address.split(" ");
      const [postalCode, city] = cityPostal.split(" ");

      return {
        place: place,
        city: city,
        address: address,
        latitude: lat,
        longitude: lng,
        mapView: mapView,
      };
    } else {
      const [address, cityPostal, country] = label.split(", ");
      // const [street, streetNumber] = address.split(" ");
      const [postalCode, city] = cityPostal.split(" ");

      return {
        city: city,
        address: address,
        latitude: lat,
        longitude: lng,
        mapView: mapView,
      };
    }
  };

  const handleStringBuilding = (location) => {
    const { city, address, place } = location;

    if (place) {
      return `${place}, ${address}, ${city}`;
    } else {
      return `${address}, ${city}`;
    }
  };

  const debounceFetch = useCallback(
    debounce((query) => handleFetch(query), 400),
    [location]
  );

  const handleFetch = async (query) => {
    const { latitude, longitude } = location;

    const url = `https://autosuggest.search.hereapi.com/v1/autosuggest?q=${query}&at=${latitude},${longitude}&in=countryCode:HRV&limit=3&apiKey=oyZL8T640Lu0e915-bCon9TlK1Psv343Apylr3luEMc`;
    const requestOptions = { method: "GET" };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      // console.log(data.items);
      setSuggestions(() => data.items);
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeTextHandler = (inputString) => {
    handleChange(ADDRESS, inputString);

    if (inputString.length >= 3) {
      debounceFetch(inputString);
    } else {
      debounceFetch.cancel();
      setSuggestions(() => []);
    }
  };

  const handlePosition = (location) => {
    const { latitude, longitude } = location;

    return { latitude: `${latitude}`, longitude: `${longitude}` };
  };

  return (
    <>
      <View
        style={StyleSheet.flatten([
          styles.container,
          { borderBottomColor: error && colors.orange },
        ])}
      >
        <Input
          value={value}
          editable={editable}
          onChangeText={onChangeTextHandler}
          placeholder="Enter and choose address"
          style={styles.input}
        />
        {suggestions !== [] &&
          suggestions
            .filter(
              (suggestion) =>
                suggestion.resultType === "place" ||
                suggestion.resultType === "street" ||
                suggestion.resultType === "houseNumber"
            )
            .map((suggestion) => {
              // console.log("=====================================");
              // console.log(suggestion);

              const location = handleSuggestData(suggestion);
              const { latitude, longitude } = location;

              return (
                suggestion.position && (
                  <TouchableOpacity
                    key={suggestion.id}
                    onPress={() => {
                      setLocation(
                        { latitude, longitude },
                        handleStringBuilding(location)
                      );
                      // handleChange(LOCATION, handlePosition(location));
                      // handleChange(ADDRESS, handleStringBuilding(location));
                      setSuggestions(() => []);
                    }}
                  >
                    <View style={styles.valueContaner}>
                      <TextField style={styles.value}>
                        {handleStringBuilding(location)}
                      </TextField>
                    </View>
                  </TouchableOpacity>
                )
              );
            })}
      </View>
      <View style={{ width: "87%" }}>
        {error && <TextField style={styles.errorMessage}>{error}</TextField>}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    alignSelf: "flex-start",
    marginLeft: 10,
    marginBottom: 7,
    marginTop: -17,
    color: colors.orange,
    fontSize: isWeb ? 13 : 19,
    fontWeight: "400",
  },
  container: {
    color: "#fff",
    backgroundColor: "#333",
    marginBottom: 19,
    width: "87%",
    borderWidth: 1.66,
    borderRadius: 5,
    borderColor: "#444",
    borderStyle: "solid",
  },
  input: {
    backgroundColor: "transparent",
    borderWidth: 0,
    fontSize: 23,
    fontWeight: "500",
    height: 47,
  },
  valueContaner: {
    padding: 7,
    borderStyle: "solid",
    borderTopWidth: 0.33,
    borderTopColor: "#555",
  },
  value: {
    color: "white",
    fontSize: 17,
  },
});

export default Autosuggest;
