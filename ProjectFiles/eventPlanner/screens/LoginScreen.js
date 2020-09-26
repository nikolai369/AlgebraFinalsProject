import React, { useContext, useState } from "react";
import { StyleSheet } from "react-native";

import { AppContext } from "../providers/AppProvider";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "../hooks/useForm";
import { loginFormValidation } from "../validation/loginFormValidation";
import DismissKeyboard from "../components/DismissKeyboard";
import FormContainer from "../components/FormContainer";
import FormField from "../components/FormField";
import Button from "../components/Button";
import colors from "../constants/colors";
import TextField from "../components/TextField";

const INITIAL_STATE = { email: "", password: "" };

const LoginForm = () => {
  const { login } = useContext(AppContext);

  const [serverMessage, setServerMessage] = useState(null);
  const navigation = useNavigation();
  const {
    formValues,
    handleChange,
    handleSubmit,
    handleInputValidation,
    errors,
    submittable,
  } = useForm(INITIAL_STATE, authLogin, loginFormValidation);

  async function authLogin() {
    const message = await login(formValues);

    if (message) {
      setServerMessage(message);
    }
  }

  return (
    <FormContainer>
      <FormField
        label="Email"
        name="email"
        value={formValues.email}
        error={errors.email}
        handleChange={handleChange}
        inputValidation={handleInputValidation}
        inputProps={{
          keyboardType: "email-address",
        }}
      />
      <FormField
        label="Password"
        name="password"
        value={formValues.password}
        error={errors.password}
        handleChange={handleChange}
        inputValidation={handleInputValidation}
        inputProps={{
          secureTextEntry: true,
        }}
      />
      {serverMessage && (
        <TextField style={styles.serverMessage}>{serverMessage}</TextField>
      )}
      <Button
        title="Login"
        boxStyle={styles.login}
        disabled={!submittable}
        // onPress={handleSubmit}
        onPress={handleSubmit}
      />

      <Button
        title="Register"
        boxStyle={styles.register}
        onPress={() => {
          navigation.navigate("register");
        }}
      />
    </FormContainer>
  );
};

export const LoginScreen = (props) => {
  return (
    <DismissKeyboard>
      <LoginForm />
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  login: {
    marginBottom: 19,
  },
  register: {
    backgroundColor: colors.magenta,
  },
  link: {
    backgroundColor: colors.magenta,
    width: "100%",
  },
  serverMessage: {
    marginBottom: 19,
    color: "#ddd",
    fontSize: 19,
    fontWeight: "300",
  },
});
