import React from "react";
import FormField from "./FormField";

const DateTime = (props) => {
  const { name, value, error, handleChange, label, editable } = props;

  return (
    <FormField
      label={label}
      name={name}
      value={value}
      error={error}
      handleChange={handleChange}
      editable={editable}
    />
  );
};

export default DateTime;
