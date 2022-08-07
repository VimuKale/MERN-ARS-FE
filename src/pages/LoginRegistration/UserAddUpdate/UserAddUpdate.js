import React, { useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Grid,
  FormControl,
  Button,
} from "@mui/material";
import * as validator from "../../../utils/validator";
import { useDispatch } from "react-redux";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Dialogue from "../../../components/Dialogue/Dialogue";
import { useNavigate, useLocation } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { RegisterAppUser, UpdateAppUser } from "../../../slices/uruSlice";

const UserAddUpdate = () => {
  const data = useLocation();
  const stateData = data.state;

  console.log(stateData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState(
    stateData ? stateData.firstName : ""
  );
  const [lastName, setLastName] = useState(stateData ? stateData.lastName : "");
  const [phone, setPhone] = useState(stateData ? stateData.phone : "");
  const [email, setEmail] = useState(stateData ? stateData.email : "");
  const [password, setPassword] = useState(stateData ? stateData.password : "");
  const [address, setAddress] = useState(stateData ? stateData.address : "");
  const [city, setCity] = useState(stateData ? stateData.city : "Pune");
  const [state, setState] = useState(
    stateData ? stateData.state : "Maharashtra"
  );
  const [zip, setZip] = useState(stateData ? stateData.zip : "");

  const [errors, setErrors] = useState({});
  const [open, setOpen] = React.useState(false);

  const [DialogMessage, setDialogueMessage] = useState("");
  const [DialogTitle, setDialogTitle] = useState("");

  const setDialogueOpen = (title, message) => {
    setDialogTitle(title);
    setDialogueMessage(message);
    setOpen(true);
  };

  const clearform = () => {
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setPassword("");
    setAddress("");
    setCity("");
    setState("");
    setZip("");
  };

  const validate = () => {
    let validateArray = {};
    validateArray.firstName = validator.isValidName(firstName);
    validateArray.lastName = validator.isValidName(lastName);
    validateArray.phone = validator.isValidMobilePhone(phone);
    validateArray.email = validator.isValidEmail(email);
    !stateData &&
      (validateArray.password = validator.isValidActualPassword(password));
    // validateArray.password = validator.isValidActualPassword(password);
    validateArray.address = validator.isValidAddress(address);
    validateArray.zip = validator.isValidZip(zip);

    setErrors({
      ...validateArray,
    });
    //RETURNS TRUE IF NO ERRORS
    return Object.values(validateArray).every((x) => x === "");
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const userDetails = {
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email,
        password: password,
        address: address,
        city: city,
        state: state,
        zip: zip,
        user_type: "USER",
      };
      setLoading(true);
      dispatch(RegisterAppUser(userDetails))
        .unwrap()
        .then((res) => {
          setLoading(false);
          setDialogueOpen("Success", "User added successfully");
          clearform();
        })
        .catch((e) => {
          setLoading(false);
          setDialogueOpen("Error", e.message);
        });
    }
  };

  const handleOnUpdate = async (e) => {
    e.preventDefault();
    if (validate()) {
      const userDetails = {
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        // email: email,
        // password: password,
        address: address,
        city: city,
        state: state,
        zip: zip,
        // user_type: "USER",
      };
      setLoading(true);
      dispatch(UpdateAppUser(userDetails))
        .unwrap()
        .then((res) => {
          setLoading(false);
          clearform();
          navigate("/userdashboard");
        })
        .catch((e) => {
          setLoading(false);
          setDialogueOpen("Error", e.message);
        });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* CARD CONTAINER */}
      <Grid
        container
        sx={{
          width: { xs: "90%", md: "70%" },
          justifyContent: "center",
          marginTop: "2rem",
          marginBottom: "2rem",
        }}
      >
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          style={{
            marginBottom: "2rem",
            color: "white",
            borderColor: "white",
            fontFamily: "Poppins",
            fontWeight: "bolder",
          }}
          onClick={() => {
            stateData ? navigate("/userdashboard") : navigate("/");
          }}
        >
          {stateData ? "Dashboard" : "Login"}
        </Button>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Paper elevation={24} sx={{ padding: "2rem", borderRadius: "25px" }}>
            <Typography
              // variant="h6"
              // fontSize="50px"
              color="#2360a5"
              sx={{
                fontFamily: "Poppins",
                float: "left",
                fontSize: { xs: "1rem", sm: "2rem", md: "2.5rem" },
                fontWeight: "bolder",
                alignSelf: "left",
              }}
            >
              {stateData ? "Update User" : "Register User"}
            </Typography>

            <br />
            <form>
              {/* FORM CONTAINER */}
              <Grid container spacing="1rem" sx={{ alignItems: "center" }}>
                {/* FIRSTNAME FIELD */}
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <div className="input-hover">
                    <TextField
                      fullWidth
                      name="First Name"
                      id="outlined-basic"
                      label="First Name"
                      placeholder="eg:John"
                      variant="outlined"
                      InputLabelProps={{
                        sx: { fontFamily: "Poppins", fontWeight: "bold" },
                      }}
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                      helperText=" "
                      {...(errors.firstName && {
                        error: true,
                        helperText: errors.firstName,
                      })}
                    />
                  </div>
                </Grid>

                {/* LASTNAME FIELD */}
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <div className="input-hover">
                    <TextField
                      helperText=" "
                      fullWidth
                      placeholder="eg:Doe"
                      id="outlined-basic"
                      label="Last Name"
                      InputLabelProps={{
                        sx: { fontFamily: "Poppins", fontWeight: "bold" },
                      }}
                      variant="outlined"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                      {...(errors.lastName && {
                        error: true,
                        helperText: errors.lastName,
                      })}
                    />
                  </div>
                </Grid>

                {/* EMAIL FIELD */}
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <div className="input-hover">
                    <TextField
                      type="email"
                      fullWidth
                      name="Email"
                      disabled={stateData ? true : false}
                      placeholder="eg:example@gmail.com"
                      id="outlined-basic"
                      label="Email"
                      InputLabelProps={{
                        sx: { fontFamily: "Poppins", fontWeight: "bold" },
                      }}
                      variant="outlined"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      helperText=" "
                      {...(errors.email && {
                        error: true,
                        helperText: errors.email,
                      })}
                    />
                  </div>
                </Grid>

                {/* PASSWORD FIELD */}
                {stateData ? null : (
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <div className="input-hover">
                      <TextField
                        type="password"
                        fullWidth
                        name="Password"
                        id="outlined-basic"
                        label="Password"
                        InputLabelProps={{
                          sx: { fontFamily: "Poppins", fontWeight: "bold" },
                        }}
                        variant="outlined"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        helperText=" "
                        {...(errors.password && {
                          error: true,
                          helperText: errors.password,
                        })}
                      />
                    </div>
                  </Grid>
                )}

                {/* PHONE FIELD */}
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <div className="input-hover">
                    <TextField
                      fullWidth
                      name="Phone"
                      placeholder="eg:7499636991"
                      id="outlined-basic"
                      label="Phone"
                      InputLabelProps={{
                        sx: { fontFamily: "Poppins", fontWeight: "bold" },
                      }}
                      variant="outlined"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      inputProps={{ maxLength: 10 }}
                      helperText=" "
                      {...(errors.phone && {
                        error: true,
                        helperText: errors.phone,
                      })}
                    />
                  </div>
                </Grid>

                {/* ADDRESS FIELD */}
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <div className="input-hover">
                    <TextField
                      helperText=" "
                      fullWidth
                      placeholder="eg:123 Main St"
                      id="outlined-basic"
                      label="Address"
                      InputLabelProps={{
                        sx: { fontFamily: "Poppins", fontWeight: "bold" },
                      }}
                      variant="outlined"
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                      {...(errors.address && {
                        error: true,
                        helperText: errors.address,
                      })}
                    />
                  </div>
                </Grid>

                {/* =============================CITY=========================== */}
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <FormControl fullWidth>
                    <InputLabel
                      id="demo-simple-select-label"
                      sx={{ fontFamily: "Poppins", fontWeight: "bolder" }}
                    >
                      City
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={city}
                      label="City"
                      sx={{ textAlign: "left", fontFamily: "Poppins" }}
                      onChange={(e) => {
                        setCity(e.target.value);
                      }}
                    >
                      <MenuItem value={"Pune"}>Pune</MenuItem>
                      <MenuItem value={"Mumbai"}>Mumbai</MenuItem>
                      <MenuItem value={"Ahmedabad"}>Ahmedabad</MenuItem>
                      <MenuItem value={"Banglore"}>Banglore</MenuItem>
                    </Select>
                    <FormHelperText sx={{ fontFamily: "Poppins" }}>
                      Select city of rescue*
                    </FormHelperText>
                  </FormControl>
                </Grid>

                {/*=================================STATE =============================*/}
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <FormControl fullWidth>
                    <InputLabel
                      id="demo-simple-select-label"
                      sx={{ fontFamily: "Poppins", fontWeight: "bolder" }}
                    >
                      State
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={state}
                      label="Animal Type"
                      sx={{ textAlign: "left", fontFamily: "Poppins" }}
                      onChange={(e) => {
                        setState(e.target.value);
                      }}
                    >
                      <MenuItem value={"Maharashtra"}>Maharashtra</MenuItem>
                      <MenuItem value={"Gujarat"}>Gujarat</MenuItem>
                      <MenuItem value={"Karnataka"}>Karnataka</MenuItem>
                    </Select>
                    <FormHelperText sx={{ fontFamily: "Poppins" }}>
                      Select state of rescue*
                    </FormHelperText>
                  </FormControl>
                </Grid>

                {/* =============================ZIP================================== */}
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <div className="input-hover">
                    <TextField
                      helperText=" "
                      fullWidth
                      id="outlined-basic"
                      label="Zip"
                      InputLabelProps={{
                        sx: { fontFamily: "Poppins", fontWeight: "bold" },
                      }}
                      placeholder="eg:411041"
                      variant="outlined"
                      value={zip}
                      onChange={(e) => {
                        setZip(e.target.value);
                      }}
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      inputProps={{ maxLength: 6 }}
                      {...(errors.zip && {
                        error: true,
                        helperText: errors.zip,
                      })}
                    />
                  </div>
                </Grid>
              </Grid>
              <div>
                {stateData ? (
                  <LoadingButton
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<AssignmentIndIcon />}
                    variant="outlined"
                    onClick={handleOnUpdate}
                    size="large"
                    sx={{
                      borderRadius: "25px",
                      // backgroundColor: "#388e3c",
                      // backgroundColor: "#2360a5",
                      textTransform: "none",
                      fontSize: "large",
                      fontWeight: "bolder",
                      fontFamily: "Poppins",
                    }}
                  >
                    <span>Update</span>
                  </LoadingButton>
                ) : (
                  <LoadingButton
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<AssignmentIndIcon />}
                    variant="outlined"
                    onClick={handleOnSubmit}
                    size="large"
                    sx={{
                      width: "100%",
                      borderRadius: "25px",
                      // backgroundColor: "#388e3c",
                      // backgroundColor: "#2360a5",
                      textTransform: "none",
                      fontSize: "large",
                      fontWeight: "bolder",
                      fontFamily: "Poppins",
                    }}
                  >
                    <span>Submit</span>
                  </LoadingButton>
                )}
              </div>
            </form>
          </Paper>
        </Grid>
      </Grid>
      <Dialogue
        title={DialogTitle}
        message={DialogMessage}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};

export default UserAddUpdate;
