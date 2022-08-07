import React, { useEffect, useState } from "react";
import { Paper, Typography, TextField, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as validator from "../../utils/validator";
import { useDispatch, useSelector } from "react-redux";
import Dialogue from "../../components/Dialogue/Dialogue";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputAdornment from "@mui/material/InputAdornment";
import PasswordRoundedIcon from "@mui/icons-material/PasswordRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { LoadingButton } from "@mui/lab";

import { LoginAppUser } from "../../slices/appUserSlice";
import { changeNavUser } from "../../slices/appBarSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.appUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("user");
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);

  const [DialogMessage, setDialogueMessage] = useState("");
  const [DialogTitle, setDialogTitle] = useState("");

  useEffect(() => {
    dispatch(changeNavUser("login"));
  }, [dispatch]);

  const setDialogueOpen = (title, message) => {
    setDialogTitle(title);
    setDialogueMessage(message);
    setOpen(true);
  };

  const validate = () => {
    let validateArray = {};
    validateArray.email = validator.isValidEmail(email);
    validateArray.password = validator.isValidPassword(password);

    setErrors({
      ...validateArray,
    });
    //RETURNS TRUE IF NO ERRORS
    return Object.values(validateArray).every((x) => x === "");
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const loginDetails = {
        email: email,
        password: password,
        type: type,
      };
      try {
        const loggedUser = await dispatch(LoginAppUser(loginDetails)).unwrap();

        setDialogueOpen("Success", "Login Successfull");
        const userType = loggedUser.payload.user_type;
        if (userType === "USER") {
          navigate("/userdashboard", { replace: true });
        } else if (userType === "SHELTER") {
          navigate("/shelterdashboard", { replace: true });
        } else if (userType === "ADMIN") {
          navigate("/admindashboard", { replace: true });
        } else if (userType === "RESCUEVAN") {
          navigate("/rescuevandashboard", { replace: true });
        }
      } catch (rejectedValueOrSerializedError) {
        // console.log("Error", rejectedValueOrSerializedError);
        setDialogueOpen("Error", rejectedValueOrSerializedError.message);
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
        sx={{ width: "24rem", justifyContent: "center", marginTop: "5.5rem" }}
      >
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Paper elevation={24} sx={{ padding: "2rem", borderRadius: "25px" }}>
            <Typography
              variant="h6"
              fontSize="50px"
              // color="success"
              // color="#4285f4"
              sx={{
                fontFamily: "Poppins",
                float: "left",
                fontWeight: "bolder",
              }}
            >
              Login
            </Typography>

            <br />
            <form onSubmit={handleOnSubmit}>
              {/* FORM CONTAINER */}
              <Grid container spacing="1rem" sx={{ alignItems: "center" }}>
                {/* EMAIL FIELD */}
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <div className="input-hover">
                    <TextField
                      fullWidth
                      id="outlined-basic1"
                      label="Email"
                      variant="outlined"
                      sx={{ fontFamily: "Poppins" }}
                      InputLabelProps={{ style: { fontFamily: "Poppins" } }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MailOutlineRoundedIcon />
                          </InputAdornment>
                        ),
                      }}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      {...(errors.email && {
                        error: true,
                        helperText: errors.email,
                      })}
                    />
                  </div>
                </Grid>

                {/* PASSWORD FIELD */}
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <div className="input-hover">
                    <TextField
                      fullWidth
                      // multiline
                      id="outlined-basic2"
                      label="Password"
                      variant="outlined"
                      value={password}
                      InputLabelProps={{ style: { fontFamily: "Poppins" } }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PasswordRoundedIcon />
                          </InputAdornment>
                        ),
                      }}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      type="password"
                      // required
                      {...(errors.password && {
                        error: true,
                        helperText: errors.password,
                      })}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <FormControl fullWidth>
                    <InputLabel
                      id="demo-simple-select-label"
                      sx={{ fontFamily: "Poppins" }}
                    >
                      User Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={type}
                      label="User Type"
                      onChange={(e) => setType(e.target.value)}
                      sx={{ textAlign: "left", fontFamily: "Poppins" }}
                    >
                      <MenuItem value={"user"}>User</MenuItem>
                      <MenuItem value={"shelter"}>Shelter</MenuItem>
                      <MenuItem value={"rescuevan"}>Rescue Vehicle</MenuItem>
                      <MenuItem value={"admin"}>Admin</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <div>
                <LoadingButton
                  loading={loading}
                  loadingPosition="start"
                  startIcon={<VpnKeyIcon />}
                  variant="contained"
                  onClick={handleOnSubmit}
                  size="large"
                  sx={{
                    borderRadius: "25px",
                    backgroundColor: "#4285F4",
                    // backgroundColor: "#2360a5",
                    textTransform: "none",
                    fontSize: "large",
                    fontWeight: "bolder",
                    fontFamily: "Poppins",
                  }}
                  style={{
                    marginTop: "1rem",
                    width: "100%",
                  }}
                >
                  Submit
                </LoadingButton>
              </div>
              <div>
                <Typography
                  style={{
                    marginTop: ".5rem",
                    fontFamily: "Poppins",
                    fontWeight: "bolder",
                    textAlign: "Left",
                  }}
                >
                  Don't have an Account?
                  <br />
                  1.&nbsp;
                  <span
                    style={{ color: "#4285F4", cursor: "pointer" }}
                    onClick={() => {
                      navigate("/usersignup");
                    }}
                  >
                    Register User
                  </span>
                  <br />
                  2.
                  <span
                    style={{ color: "#4285F4", cursor: "pointer" }}
                    onClick={() => {
                      navigate("/sheltersignup");
                    }}
                  >
                    Register Shelter
                  </span>
                  <br />
                  3.
                  <span
                    style={{ color: "#4285F4", cursor: "pointer" }}
                    onClick={() => {
                      navigate("/rescuevehiclesignup");
                    }}
                  >
                    Register Rescue Vehicle
                  </span>
                </Typography>
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

export default Login;
