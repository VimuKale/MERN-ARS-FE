import React, { useState } from "react";
import { Paper, Typography, TextField, Grid, Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import Dialogue from "../../components/Dialogue/Dialogue";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import * as validator from "../../utils/validator";
import { useSelector } from "react-redux";
import axios from "axios";

const RescueRequestForm = () => {
  const { _id, email } = useSelector((state) => state.appUser.user);
  const accessToken = useSelector((state) => state.appUser.accessToken);

  const [animalType, setAnimalType] = useState("Dog");
  const [rescueLocation, setRescueLocation] = useState("");
  const [landmark, setLandmark] = useState("");
  const [desc, setDesc] = useState("");
  const [city, setCity] = useState("Pune");
  const [state, setState] = useState("Maharashtra");
  const [zip, setZip] = useState("");
  const [photo, setPhoto] = useState("");

  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [DialogMessage, setDialogueMessage] = useState("");
  const [DialogTitle, setDialogTitle] = useState("");

  const setDialogueOpen = (title, message) => {
    setDialogTitle(title);
    setDialogueMessage(message);
    setOpen(true);
  };

  const ClearForm = () => {
    setAnimalType("Dog");
    setRescueLocation("");
    setLandmark("");
    setDesc("");
    setCity("Pune");
    setState("Maharashtra");
    setZip("");
    setPhoto("");
  };

  const validate = () => {
    let validateArray = {};
    validateArray.rescueLocation = validator.isValidAddress(rescueLocation);
    validateArray.landmark = validator.isValidAddress(landmark);
    validateArray.desc = validator.isValidAddress(desc);
    validateArray.zip = validator.isValidZip(zip);

    setErrors({
      ...validateArray,
    });
    //RETURN TRUE IF NO ERRORS
    return Object.values(validateArray).every((value) => value === "");
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const formData = new FormData();
      formData.append("id", _id);
      formData.append("email", email);
      formData.append("rrimg", photo);
      formData.append("animal_type", animalType);
      formData.append("r_loc", rescueLocation);
      formData.append("r_landmark", landmark);
      formData.append("r_desc", desc);
      formData.append("r_city", city);
      formData.append("r_state", state);
      formData.append("r_zip", zip);
      try {
        const response = await axios.post(
          "http://localhost:3000/rr/rescuerequest",
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setDialogueOpen(
          "Success",
          `Rescue Request Submitted Successfully. Ref Id:${response.data.payload._id}`
        );
        ClearForm();
      } catch (e) {
        console.log(e);
        console.log("Error:", e?.response?.data?.message);
        setDialogueOpen("Error", `${e?.response?.data?.message}`);
      }
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
          width: { xs: "90%", sm: "80%", md: "70%" },
          justifyContent: "center",
          marginTop: "3rem",
        }}
      >
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Paper elevation={24} sx={{ padding: "2rem", borderRadius: "25px" }}>
            <Typography
              variant="h6"
              color="error"
              sx={{
                fontFamily: "Poppins",
                fontSize: { xs: "1.3rem", sm: "1.6rem", md: "2rem" },
                float: "left",
                fontWeight: "bolder",
                alignSelf: "left",
              }}
            >
              Register Rescue Request
            </Typography>

            <br />
            <form>
              {/* FORM CONTAINER */}
              <Grid container spacing="1rem" sx={{ alignItems: "center" }}>
                {/*----------------- ANIMAL TYPE------------------------- */}
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <FormControl fullWidth>
                    <InputLabel
                      id="demo-simple-select-label"
                      sx={{ fontFamily: "Poppins" }}
                    >
                      Animal Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={animalType}
                      label="Animal Type"
                      sx={{ textAlign: "left", fontFamily: "Poppins" }}
                      onChange={(e) => {
                        setAnimalType(e.target.value);
                      }}
                    >
                      <MenuItem value={"Dog"}>Dog</MenuItem>
                      <MenuItem value={"Cat"}>Cat</MenuItem>
                      <MenuItem value={"Wild Animal"}>Wild Animal</MenuItem>
                      <MenuItem value={"Other"}>other</MenuItem>
                    </Select>
                    <FormHelperText sx={{ fontFamily: "Poppins" }}>
                      Select type of animal*
                    </FormHelperText>
                  </FormControl>
                </Grid>

                {/* --------------------RESCUE LOCATION-------------------------- */}
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <div className="input-hover">
                    <TextField
                      fullWidth
                      helperText=" "
                      id="outlined-basic"
                      label="Rescue Location"
                      InputLabelProps={{ style: { fontFamily: "Poppins" } }}
                      placeholder="Add precise location"
                      variant="outlined"
                      value={rescueLocation}
                      onChange={(e) => {
                        setRescueLocation(e.target.value);
                      }}
                      {...(errors.rescueLocation && {
                        error: true,
                        helperText: errors.rescueLocation,
                      })}
                    />
                  </div>
                </Grid>

                {/* -------------------LANDMARK ------------------------*/}
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <div className="input-hover">
                    <TextField
                      helperText=" "
                      fullWidth
                      id="outlined-basic"
                      label="Rescue Landmark"
                      InputLabelProps={{ style: { fontFamily: "Poppins" } }}
                      placeholder="Preferable Google Plus Code "
                      variant="outlined"
                      value={landmark}
                      onChange={(e) => {
                        setLandmark(e.target.value);
                      }}
                      {...(errors.landmark && {
                        error: true,
                        helperText: errors.landmark,
                      })}
                    />
                  </div>
                </Grid>

                {/*======================= DESCRIPTION============================== */}
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <div className="input-hover">
                    <TextField
                      helperText=" "
                      fullWidth
                      id="outlined-basic"
                      label="Description"
                      InputLabelProps={{ style: { fontFamily: "Poppins" } }}
                      placeholder="Describe the animal condition which is to be rescued"
                      variant="outlined"
                      value={desc}
                      onChange={(e) => {
                        setDesc(e.target.value);
                      }}
                      {...(errors.desc && {
                        error: true,
                        helperText: errors.desc,
                      })}
                    />
                  </div>
                </Grid>

                {/* =============================CITY=========================== */}
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <FormControl fullWidth>
                    <InputLabel
                      id="demo-simple-select-label"
                      sx={{ fontFamily: "Poppins" }}
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
                      sx={{ fontFamily: "Poppins" }}
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
                      InputLabelProps={{ style: { fontFamily: "Poppins" } }}
                      placeholder="eg:411041"
                      variant="outlined"
                      value={zip}
                      onChange={(e) => {
                        setZip(e.target.value);
                      }}
                      {...(errors.zip && {
                        error: true,
                        helperText: errors.zip,
                      })}
                    />
                  </div>
                </Grid>

                {/* ============================UPLOAD PICTURE================================= */}
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <FormControl fullWidth>
                    <Button variant="outlined" size="large" component="label">
                      {!photo ? "Upload Animal Picture" : `${photo.name}`}
                      <input
                        hidden
                        accept="image/*"
                        multiple
                        type="file"
                        onChange={(e) => {
                          setPhoto(e.target.files[0]);
                        }}
                      />
                    </Button>
                    <FormHelperText sx={{ fontFamily: "Poppins" }}>
                      eg:img.jpeg
                    </FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>

              {/* ====================Submit Button============== */}
              <div>
                <LoadingButton
                  //   loading={loading}
                  loadingPosition="start"
                  startIcon={<SendIcon />}
                  variant="contained"
                  onClick={handleOnSubmit}
                  disabled={!photo ? true : false}
                  size="large"
                  sx={{
                    borderRadius: "25px",
                    backgroundColor: "#d32f2f",
                    textTransform: "none",
                    fontSize: "large",
                    fontWeight: "bolder",
                    fontFamily: "Poppins",
                    maxWidth: { xs: "70%", md: "50%" },
                    alignItems: "right",
                    ":hover": {
                      backgroundColor: "#0F9D58",
                    },
                  }}
                  style={{
                    marginTop: "1rem",
                    width: "100%",
                  }}
                >
                  Submit
                </LoadingButton>
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

export default RescueRequestForm;
