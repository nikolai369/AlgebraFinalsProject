import React, { useState, useEffect, useContext } from "react";
import { StyleSheet } from "react-native";

import { AppContext } from "../providers/AppProvider";
import { useForm } from "../hooks/useForm";
import { registerFormValidation } from "../validation/registerFormValidation";
import DismissKeyboard from "../components/DismissKeyboard";
import FormContainer from "../components/FormContainer";
import FormField from "../components/FormField";
import Button from "../components/Button";
import Loading from "../components/Loading";
import colors from "../constants/colors";

const INITIAL_VALUES = {
  name: "",
  surname: "",
  password: "",
  confirmPassword: "",
};

const ProfileForm = (props) => {
  const { user } = useContext(AppContext);

  const [isEditable, setEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    formValues,
    handleChange,
    handleSubmit,
    errors,
    submittable,
    setFormValues,
  } = useForm(INITIAL_VALUES, onConfirmEdit, registerFormValidation);

  useEffect(() => {
    const { FirstName, LastName, Password } = user;
    setFormValues({ name: FirstName, surname: LastName, password: Password });
  }, []);

  const onCancle = () => {
    setFormValues([]);
    setEditable(false);
  };

  function onConfirmEdit() {
    //Update server
  }

  if (loading) {
    <Loading />;
  }

  return (
    <FormContainer>
      <FormField
        label="Name"
        name="name"
        value={formValues.name}
        error={errors.name}
        handleChange={handleChange}
        inputProps={{
          editable: isEditable,
        }}
      />
      <FormField
        label="Surname"
        name="surname"
        value={formValues.surname}
        error={errors.surname}
        handleChange={handleChange}
        inputProps={{
          editable: isEditable,
        }}
      />
      <FormField
        label="Password"
        name="password"
        value={formValues.password}
        error={errors.password}
        handleChange={handleChange}
        inputProps={{
          editable: isEditable,
          secureTextEntry: true,
        }}
      />
      {isEditable && (
        <Button
          title="Update"
          disabled={!submittable}
          onPress={handleSubmit}
          boxStyle={styles.update}
        />
      )}
      <Button
        title={isEditable ? "Cancle" : "Edit"}
        onPress={isEditable ? onCancle : () => setEditable(() => true)}
        boxStyle={styles.edit}
      />
    </FormContainer>
  );
};

const ProfileScreen = (props) => {
  return (
    <DismissKeyboard>
      <ProfileForm />
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  update: {
    marginBottom: 19,
  },
  edit: {
    backgroundColor: colors.magenta,
  },
});

export default ProfileScreen;
