import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";

export const useForm = (initialValues, submitFunction, validationFunction) => {
  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submittable, setSubmittable] = useState(false);

  //Check if object has no propeties
  const isEmptyObject = (object) => {
    return Object.keys(object).length === 0 ? true : false;
  };

  //Check for errors
  useEffect(() => {
    if (isEmptyObject(errors)) {
      setSubmittable(true);
    } else {
      setSubmittable(false);
    }
  }, [errors]);

  //Handle input values
  const handleChange = (name, value) => {
    setFormValues(() => {
      return { ...formValues, [name]: value };
    });
  };

  //Validate all inputs on form submit
  const allInputsSubmittable = () => {
    let errorResult;
    let errorMessage;
    let currentErrors;

    for (let name in formValues) {
      errorMessage = validationFunction(name, formValues[name]);

      if (!errorMessage) {
        currentErrors = errors;
        delete currentErrors[name];

        setErrors({ ...currentErrors });
      } else {
        errorResult = {
          ...errorResult,
          [name]: errorMessage,
        };
      }
    }

    const allErrors = { ...errors, ...errorResult };
    setErrors(allErrors);

    return isEmptyObject(allErrors);
  };

  const submit = () => {
    console.log(formValues);
    if (allInputsSubmittable()) {
      console.log(submitFunction);
      submitFunction(formValues);
    }
    setSubmittable(() => false);
  };

  const handleSubmit = useCallback(debounce(submit, 800), [formValues]);

  //Validate single form input
  const handleInputValidation = useCallback(
    debounce((name, value) => inputValidation(name, value), 800),
    []
  );

  const inputValidation = (name, value) => {
    //Check if confirm password
    if (name === "confirmPassword") {
      if (value === formValues.password) {
        console.log("confirm pass validation");
        const currentErrors = errors;
        delete currentErrors.confirmPassword;
        setErrors({ ...currentErrors });
        return;
      } else {
        setErrors({ confirmPassword: "Password not matching" });
        return;
      }
    }

    const errorMessage = validationFunction(name, value);

    if (!errorMessage) {
      const currentErrors = errors;
      delete currentErrors[name];

      setErrors({ ...currentErrors });
      return;
    }

    const errorResult = {
      ...errors,
      [name]: errorMessage,
    };

    setErrors(errorResult);
  };

  return {
    formValues,
    handleChange,
    handleSubmit,
    handleInputValidation,
    errors,
    submittable,
    setFormValues,
  };
};
