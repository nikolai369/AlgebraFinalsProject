export const registerFormValidation = (name, value) => {
  //Email validation
  if (name === "email") {
    if (!value) {
      return "Email required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      return "Enter a valid email address";
    }
  }
  //Password validation
  if (name === "password") {
    if (!value) {
      return "Password required";
    }
    //else if (
    //   !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)
    // ) {
    //   return "Invalid password. Minimum 8 characters. At least one letter and number";
    // }
  }
  //Name and surname validation
  if (name === "name" || name === "surname") {
    if (!value) {
      return name + " required";
    } else if (!/[a-zA-Z]+$/i.test(value)) {
      return "Alphabetical characters only";
    }
  }
};
