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
import { RegisterShelter, UpdateShelter } from "../../../slices/uruSlice";

const ShelterAddUpdate = () => {
  const data = useLocation();
  const stateData = data.state;

  //   console.log(stateData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [s_name, setSName] = useState(stateData ? stateData.s_name : "");
  const [s_phone, setPhone] = useState(stateData ? stateData.s_phone : "");
  const [s_category, setCategory] = useState(
    stateData ? stateData.s_category : "Dog"
  );
  const [email, setEmail] = useState(stateData ? stateData.email : "");
  const [password, setPassword] = useState(stateData ? stateData.password : "");
  const [s_address, setAddress] = useState(
    stateData ? stateData.s_address : ""
  );
  const [s_city, setCity] = useState(stateData ? stateData.s_city : "Pune");
  const [s_state, setState] = useState(
    stateData ? stateData.s_state : "Maharashtra"
  );
  const [s_zip, setZip] = useState(stateData ? stateData.s_zip : "");

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
    setSName("");
    setCategory("");
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
    validateArray.s_name = validator.isValidName(s_name);
    validateArray.s_category = validator.isValidName(s_category);
    validateArray.s_phone = validator.isValidMobilePhone(s_phone);
    validateArray.email = validator.isValidEmail(email);
    !stateData &&
      (validateArray.password = validator.isValidActualPassword(password));
    // validateArray.password = validator.isValidActualPassword(password);
    validateArray.s_address = validator.isValidAddress(s_address);
    validateArray.s_zip = validator.isValidZip(s_zip);

    setErrors({
      ...validateArray,
    });
    //RETURNS TRUE IF NO ERRORS
    return Object.values(validateArray).every((x) => x === "");
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const shelterDetails = {
        s_name: s_name,
        s_category: s_category,
        s_phone: s_phone,
        email: email,
        password: password,
        s_address: s_address,
        s_city: s_city,
        s_state: s_state,
        s_zip: s_zip,
        user_type: "SHELTER",
      };
      setLoading(true);
      dispatch(RegisterShelter(shelterDetails))
        .unwrap()
        .then((res) => {
          setLoading(false);
          setDialogueOpen("Success", "Shelter added successfully");
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
      const shelterDetails = {
        s_name: s_name,
        s_category: s_category,
        s_phone: s_phone,
        s_address: s_address,
        s_city: s_city,
        s_state: s_state,
        s_zip: s_zip,
      };
      setLoading(true);
      dispatch(UpdateShelter(shelterDetails))
        .unwrap()
        .then((res) => {
          setLoading(false);
          clearform();
          navigate("/shelterdashboard");
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
            stateData ? navigate("/shelterdashboard") : navigate("/");
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
              {stateData ? "Update Shelter" : "Register Shelter"}
            </Typography>

            <br />
            <form>
              {/* FORM CONTAINER */}
              <Grid container spacing="1rem" sx={{ alignItems: "center" }}>
                {/* SHELTER FIELD */}
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <div className="input-hover">
                    <TextField
                      fullWidth
                      name="Shelter Name"
                      id="outlined-basic"
                      label="Shelter Name"
                      placeholder="eg:Saath Foundation"
                      variant="outlined"
                      InputLabelProps={{
                        sx: { fontFamily: "Poppins", fontWeight: "bold" },
                      }}
                      value={s_name}
                      onChange={(e) => {
                        setSName(e.target.value);
                      }}
                      helperText=" "
                      {...(errors.s_name && {
                        error: true,
                        helperText: errors.s_name,
                      })}
                    />
                  </div>
                </Grid>

                {/* CATEGORY FIELD */}
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <FormControl fullWidth>
                    <InputLabel
                      id="demo-simple-select-label"
                      sx={{ fontFamily: "Poppins", fontWeight: "bolder" }}
                    >
                      Category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={s_category}
                      label="category"
                      sx={{ textAlign: "left", fontFamily: "Poppins" }}
                      onChange={(e) => {
                        setCategory(e.target.value);
                      }}
                    >
                      <MenuItem value={"dog"}>Dog</MenuItem>
                      <MenuItem value={"cat"}>Cat</MenuItem>
                      <MenuItem value={"hybrid"}>Hybrid</MenuItem>
                      <MenuItem value={"wildlife"}>WildLife</MenuItem>
                      <MenuItem value={"other"}>Other</MenuItem>
                    </Select>
                    <FormHelperText sx={{ fontFamily: "Poppins" }}>
                      Select shelter category*
                    </FormHelperText>
                  </FormControl>
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
                      value={s_phone}
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
                      {...(errors.s_phone && {
                        error: true,
                        helperText: errors.s_phone,
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
                      value={s_address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                      {...(errors.s_address && {
                        error: true,
                        helperText: errors.s_address,
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
                      value={s_city}
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
                      Select shelter city*
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
                      value={s_state}
                      label="State"
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
                      Select shelter state*
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
                      value={s_zip}
                      onChange={(e) => {
                        setZip(e.target.value);
                      }}
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      inputProps={{ maxLength: 6 }}
                      {...(errors.s_zip && {
                        error: true,
                        helperText: errors.s_zip,
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

export default ShelterAddUpdate;
