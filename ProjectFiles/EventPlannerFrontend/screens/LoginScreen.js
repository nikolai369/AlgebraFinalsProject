import React, { useContext } from "react";
import { Button, Platform, Keyboard } from "react-native";

import Card from "../components/Card";
import Input from "../components/Input";
import Center from "../components/Center";
import { AuthContext } from "../providers/AuthProvider";
import LinkButton from "../components/LinkButton";
import { useForm } from "../hooks/useForm";
import TextField from "../components/TextField";
import ButtonContainer from "../components/ButtonContainer";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const isWeb = Platform.OS === "web";

export const LoginScreen = (props) => {
  const { login } = useContext(AuthContext);
  const [formValues, setFormValues] = useForm({ Email: "", Password: "" });

  return (
    <Center>
      {/* <TouchableWithoutFeedback
        style={{ padding: 40 }}
        onPress={() => Keyboard.dismiss()}
      > */}
        <Card>
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
          <ButtonContainer>
            <Button title="Log in" color="green" onPress={() => login({
              Email: formValues.Email,
              Password: formValues.Password
              })} />
            {isWeb ? (
              <LinkButton to="/signup" title="Register" onPress={() => {}} />
            ) : (
              <Button
                color="blue"
                title="Register"
                onPress={() => {
                  props.navigation.navigate("SignUp");
                }}
              />
            )}
          </ButtonContainer>
        </Card>
      {/* </TouchableWithoutFeedback> */}
    </Center>
  );
};
