const checkForm = (formData, eventDate, eventTime) => {
  let errors = {};
  checkIfEmpty(formData.title, "title", errors);
  checkIfEmpty(formData.description, "description", errors);
  checkIfHasNumbers(formData.title, "title", errors);
  checkIfHasLetters(formData.event_fee, "fee", errors);
  checkIfHasLetters(formData.reward, "reward", errors);
  checkIfEmail(formData.coordinator.email, "email", errors);
  checkIfHasLetters(formData.duration, "duration", errors);
  checkIfEmpty(eventDate, "eventDate", errors);
  checkDataFormat(eventDate, "eventDate", errors);
  checkIfEmpty(eventTime, "eventTime", errors);
  checkTimeFormat(eventTime, "eventTime", errors);
  checkIfDateBeforeNow(eventDate, "eventDate", errors);
  return errors;
};

const checkIfEmpty = (fieldValue, fieldName, errors) => {
  if (!fieldValue || fieldValue === "") {
    errors[fieldName] =
      fieldName.charAt(0).toUpperCase() +
      fieldName.slice(1) +
      " cannot be empty";
  }
};
const checkIfHasNumbers = (fieldValue, fieldName, errors) => {
  if (fieldValue !== "" && !/^[a-zA-Z]+$/.test(fieldValue)) {
    errors[fieldName] =
      fieldName.charAt(0).toUpperCase() +
      fieldName.slice(1) +
      " cannot have numbers";
  }
};
const checkIfHasLetters = (fieldValue, fieldName, errors) => {
  if (fieldValue !== "" && !/^\d+$/.test(fieldValue)) {
    errors[fieldName] =
      fieldName.charAt(0).toUpperCase() +
      fieldName.slice(1) +
      " cannot have letters";
  }
};
const checkIfEmail = (fieldValue, fieldName, errors) => {
  if (fieldValue !== "" && !/\S+@\S+\.\S+/.test(fieldValue)) {
    errors[fieldName] = "Email has invalid format";
  }
};
const checkDataFormat = (fieldValue, fieldName, errors) => {
  if (
    fieldValue !== "" &&
    !/^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/.test(fieldValue)
  ) {
    errors[fieldName] =
      fieldName.charAt(0).toUpperCase() +
      fieldName.slice(1) +
      " has invalid format";
  }
};
const checkTimeFormat = (fieldValue, fieldName, errors) => {
  if (fieldValue !== "" && !/^(0?[1-9]|1[0-2]);[0-5][0-9]$/.test(fieldValue)) {
    errors[fieldName] =
      fieldName.charAt(0).toUpperCase() +
      fieldName.slice(1) +
      " has invalid format";
  }
};
const checkIfDateBeforeNow = (fieldValue, fieldName, errors) => {
  let dateNow = new Date();
  let eventDateParsed = new Date(fieldValue);
  if (
    fieldValue !== "" &&
    eventDateParsed < dateNow &&
    /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/.test(fieldValue)
  ) {
    errors[fieldName] = "Date is before current one";
  }
};
export { checkForm };
