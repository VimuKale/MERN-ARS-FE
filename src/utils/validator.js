import validator from "validator";

export const isValidEmail = (email) => {
  if (email.length === 0) {
    return "Email Field is Required";
  } else if (email.trim().length === 0) {
    return "Enter valid email, spaces detected";
  } else if (!validator.isEmail(email)) {
    return "Invalid Email Type";
  } else {
    return "";
  }
};

export const isValidMobilePhone = (phone) => {
  if (phone.length === 0) {
    return "Phone Field is Required";
  } else if (phone.trim().length === 0) {
    return "Enter valid Phone, spaces detected";
  } else if (!validator.isMobilePhone(phone)) {
    return "Number Must Be Of 10 digits";
  } else {
    return "";
  }
};

export const isValidPassword = (password) => {
  if (password.length === 0) {
    return "Password is Required";
  } else if (password.trim().length === 0) {
    return "Spaces detected, enter correct password";
  } else {
    return "";
  }
};

const validatePasswordExp = (password) => {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,32}$/;
  return regex.test(password);
};

export const isValidActualPassword = (password) => {
  if (password.length === 0) {
    return "Password is Required";
  } else if (password.trim().length === 0) {
    return "Spaces detected";
  } else if (!validatePasswordExp(password)) {
    return "combination of upper/lowercase letters symbol & number and length between 8-32";
  } else {
    return "";
  }
};

export const isValidName = (fullname) => {
  if (fullname.length === 0) {
    return "This field is Required*";
  } else if (fullname.trim().length === 0) {
    return "Enter valid value, spaces detected";
  } else if (fullname.length < 2) {
    return "Single character not allowed*";
  } else {
    return "";
  }
};

export const isValidAddress = (address) => {
  if (address.length === 0) {
    return "This field is Required*";
  } else if (address.trim().length === 0) {
    return "Enter valid Data, spaces detected*";
  } else if (address.length < 3) {
    return "too short*";
  } else if (address.length > 500) {
    return "too Long*";
  } else {
    return "";
  }
};

export const isValidZip = (zip) => {
  if (zip.length === 0) {
    return "This field is Required*";
  } else if (zip.trim().length === 0) {
    return "Enter valid Data, spaces detected*";
  } else if (zip.length < 6) {
    return "too short*";
  } else if (zip.length > 6) {
    return "too Long*";
  } else {
    return "";
  }
};
