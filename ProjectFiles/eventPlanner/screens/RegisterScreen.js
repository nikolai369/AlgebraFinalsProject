import React, { useContext } from "react";
import { StyleSheet, Platform } from "react-native";

import { AppContext } from "../providers/AppProvider";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "../hooks/useForm";
import { registerFormValidation } from "../validation/registerFormValidation";
import FormField from "../components/FormField";
import FormContainer from "../components/FormContainer";
import DismissKeyboard from "../components/DismissKeyboard";
import Button from "../components/Button";
import colors from "../constants/colors";

const isWeb = Platform.OS === "web";

const INITIAL_STATE = {
  name: "",
  surname: "",
  email: "",
  password: "",
};

const RegisterForm = () => {
  const { register } = useContext(AppContext);
  const navigation = useNavigation();
  const {
    formValues,
    handleChange,
    handleSubmit,
    handleInputValidation,
    errors,
    submittable,
    setFormValues,
  } = useForm(INITIAL_STATE, registerUser, registerFormValidation);

  async function registerUser() {
    const { name, surname, email, password } = formValues;
    await register({
      Email: email,
      Password: password,
      FirstName: name,
      LastName: surname,
    });
  }

  return (
    <FormContainer>
      <FormField
        label="Name"
        name="name"
        value={formValues.name}
        error={errors.name}
        handleChange={handleChange}
        inputValidation={handleInputValidation}
        inputProps={{
          autoCapitalize: "words",
        }}
      />
      <FormField
        label="Surname"
        name="surname"
        value={formValues.surname}
        error={errors.surname}
        handleChange={handleChange}
        inputValidation={handleInputValidation}
        inputProps={{
          autoCapitalize: "words",
        }}
      />
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
      <Button
        title="Register"
        disabled={!submittable}
        onPress={handleSubmit}
        boxStyle={styles.register}
      />

      <Button
        title="Login"
        boxStyle={styles.login}
        onPress={() => {
          navigation.navigate("login");
          setFormValues(INITIAL_STATE);
        }}
      />
    </FormContainer>
  );
};

export const RegisterScreen = (props) => {
  return (
    <DismissKeyboard>
      <RegisterForm />
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  register: {
    marginBottom: 19,
  },
  login: {
    backgroundColor: colors.magenta,
  },
  link: {
    backgroundColor: colors.magenta,
    width: "100%",
  },
});
