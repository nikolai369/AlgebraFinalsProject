import React from "react";
import Center from "../components/Center";
import TextField from "../components/TextField";
import Input from "../components/Input";
import { useForm } from "../hooks/useForm";
import Card from "../components/Card";
import { Button, Keyboard } from "react-native";
import ButtonContainer from "../components/ButtonContainer";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export const CreateEventScreen = (props) => {
  const [formValues, setFormValues] = useForm({
    title: "",
    start: "",
    end: "",
    location: "",
    price: "",
  });

  return (
    <Center>
      <TouchableWithoutFeedback
        style={{ padding: 40 }}
        onPress={() => Keyboard.dismiss()}
      >
        <Card>
          <TextField>Title: </TextField>
          <Input name="title" />
          <TextField>Start: </TextField>
          <Input name="start" />
          <TextField>End: </TextField>
          <Input name="end" />
          <TextField>Location: </TextField>
          <Input name="location" />
          <TextField>Ticket price: </TextField>
          <Input name="price" />
          <ButtonContainer>
            <Button title="Create" color="green" onPress={() => {}} />
          </ButtonContainer>
        </Card>
      </TouchableWithoutFeedback>
    </Center>
  );
};
