export const loginFormValidation = (name, value) => {
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
    } //else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)) {
    //     errors.password = 'Invalid password. Minimum 8 characters. At least one letter and number';
    // }
  }
};
