export const eventFormValidation = (name, value) => {
  //Location validation
  if (name === "location") {
    if (value === null || !value) {
      return "Choose a suggested location";
    }
  }
  //Title validation
  if (name === "title") {
    if (value === "") {
      return "Title required";
    }
  }
  if (name === "start") {
    if (value === "") {
      return "Start date/time required";
    }
  }
  if (name === "end") {
    if (value === "") {
      return "End date/time required";
    }
  }
};
