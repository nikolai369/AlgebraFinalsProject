import React, { useContext } from "react";
import { View, StyleSheet, Button, Platform, Keyboard } from "react-native";

import Card from "../components/Card";
import Input from "../components/Input";
import Center from "../components/Center";
import {RegisterContext} from "../providers/RegisterProvider";
import LinkButton from "../components/LinkButton";
import { useForm } from "../hooks/useForm";
import TextField from "../components/TextField";
import ButtonContainer from "../components/ButtonContainer";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const isWeb = Platform.OS === "web";

export const RegisterScreen = (props) => {
  const { register } = useContext(RegisterContext);
  const [formValues, setFormValues] = useForm({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    confirmPassword: "",
    Age: "",
    IBAN: "",
    Info: "",
  });

  const test = () => {
    console.log(formValues.FirstName);
  };

  return (
    <Center>
      {/* <TouchableWithoutFeedback
        style={{ padding: 40 }}
        onPress={() => Keyboard.dismiss()}
      > */}
        <Card style={styles.inputContainer}>
          <TextField>Name: </TextField>
          <Input 
            name="FirstName" 
            value={formValues.FirstName} 
            onChange={setFormValues} 
            />
          <TextField>Surname: </TextField>
          <Input
            name="LastName"
            value={formValues.LastName}
            onChange={setFormValues}
          />
          <TextField>Email: </TextField>
          <Input
            name="Email"
            value={formValues.Email}
            onChange={setFormValues}
            keyboardType="email-address"
          />
          <TextField>Password: </TextField>
          <Input
            name="Password"
            value={formValues.Password}
            onChange={setFormValues}
            secureTextEntry={true}
          />
          <TextField>Confirm password: </TextField>
          <Input
            name="confirmPassword"
            value={formValues.confirmPassword}
            onChange={setFormValues}
            secureTextEntry={true}
          />
          <TextField>Age: </TextField>
          <Input
            name="Age"
            value={formValues.Age}
            onChange={setFormValues}
            
          />
          <TextField>IBAN: </TextField>
          <Input
            name="IBAN"
            value={formValues.IBAN}
            onChange={setFormValues}
            
          />
          <TextField>Info: </TextField>
          <Input
            name="Info"
            value={formValues.Info}
            onChange={setFormValues}
            
          />
          <ButtonContainer>
            <Button title="Confirm" color="green" onPress={() => register({
              FirstName: formValues.FirstName,
              LastName: formValues.LastName,
              Email: formValues.Email,
              Password: formValues.Password,
              Age: formValues.Age,
              IBAN: formValues.IBAN,
              Info: formValues.Info
              })} />
            {isWeb ? (
              <LinkButton
                to="/signin"
                title="Cancle"
                color="red"
                onPress={() => {}}
              />
            ) : (
              <Button
                title="Cancle"
                color="red"
                onPress={() => {
                  props.navigation.navigate("SignIn");
                }}
              />
            )}
          </ButtonContainer>
        </Card>
      {/* </TouchableWithoutFeedback> */}
    </Center>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    alignContent: "center",
    width: 300,
  },
});
