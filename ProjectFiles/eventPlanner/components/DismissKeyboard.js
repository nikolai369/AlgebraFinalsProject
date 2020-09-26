import React from "react";
import {
  TouchableWithoutFeedback,
  StyleSheet,
  Keyboard,
  View,
  Platform,
} from "react-native";

const isWeb = Platform.OS === "web";

const DismissKeyboard = (props) => {
  const { children } = props;

  return isWeb ? (
    children
  ) : (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      style={styles.fullScreen}
    >
      <View style={styles.fullScreen}>{children}</View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
});

export default DismissKeyboard;
