import React, { useEffect, useState } from "react";
import {
  Paper,
  Button,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { changeNavUser } from "../../slices/appBarSlice";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [UserData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const { user, accessToken } = useSelector((state) => state.appUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(changeNavUser("user"));
    axios
      .get("http://localhost:3000/users/user", {
        params: {
          id: user._id,
        },
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setUserData(response.data.payload);
      })
      .catch((e) => {
        setError(e?.response?.data.message);
      });
  }, [user, accessToken, dispatch]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "7rem",
        }}
      >
        {error && <h3>{error}</h3>}

        {!UserData && <CircularProgress />}

        {UserData && (
          <Grid
            container
            sx={{
              width: { xs: "90%", sm: "80%", md: "70%" },
              justifyContent: "center",
              marginBottom: "4rem",
            }}
          >
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Paper
                elevation={24}
                style={{
                  boxShadow: " 0 25px 50px rgba(0,0,0,0.55)",
                }}
                sx={{ padding: "2rem", borderRadius: "25px" }}
              >
                <Typography
                  sx={{
                    fontSize: {
                      lg: "2.5rem",
                      md: "2.3rem",
                      sm: "2rem",
                      xs: "1.5rem",
                    },
                  }}
                  style={{
                    fontFamily: "Poppins",
                    textAlign: "left",
                    fontWeight: "bolder",
                    color: "#2360a5",
                  }}
                >
                  User Dashboard
                </Typography>
                <br />
                <br />
                <div>
                  {/* FORM CONTAINER */}
                  <Grid container spacing="1rem" sx={{ alignItems: "center" }}>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <div style={{ textAlign: "left" }}>
                        <label
                          style={{
                            fontWeight: "bold",
                            fontSize: "large",
                            color: "#2360a5",
                          }}
                        >
                          Name:
                        </label>
                        <Typography
                          sx={{ fontWeight: "bold", fontFamily: "Poppins" }}
                        >
                          {UserData.firstName} {UserData.lastName}
                        </Typography>
                      </div>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <div style={{ textAlign: "left" }}>
                        <label
                          style={{
                            fontWeight: "bold",
                            fontSize: "large",
                            color: "#2360a5",
                          }}
                        >
                          Email
                        </label>
                        <Typography
                          sx={{ fontWeight: "bold", fontFamily: "Poppins" }}
                        >
                          {UserData.email}
                        </Typography>
                      </div>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <div style={{ textAlign: "left" }}>
                        <label
                          style={{
                            fontWeight: "bold",
                            fontSize: "large",
                            color: "#2360a5",
                          }}
                        >
                          Phone
                        </label>
                        <Typography
                          sx={{ fontWeight: "bold", fontFamily: "Poppins" }}
                        >
                          +91 {UserData.phone}
                        </Typography>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <div style={{ textAlign: "left" }}>
                        <label
                          style={{
                            fontWeight: "bold",
                            fontSize: "large",
                            color: "#2360a5",
                          }}
                        >
                          Address
                        </label>
                        <Typography
                          sx={{ fontWeight: "bold", fontFamily: "Poppins" }}
                        >
                          {UserData.address}
                        </Typography>
                      </div>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <div style={{ textAlign: "left" }}>
                        <label
                          style={{
                            fontWeight: "bold",
                            fontSize: "large",
                            color: "#2360a5",
                          }}
                        >
                          City
                        </label>
                        <Typography
                          sx={{ fontWeight: "bold", fontFamily: "Poppins" }}
                        >
                          {UserData.city}
                        </Typography>
                      </div>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <div style={{ textAlign: "left" }}>
                        <label
                          style={{
                            fontWeight: "bold",
                            fontSize: "large",
                            color: "#2360a5",
                          }}
                        >
                          State
                        </label>
                        <Typography
                          sx={{ fontWeight: "bold", fontFamily: "Poppins" }}
                        >
                          {UserData.state}
                        </Typography>
                      </div>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <div style={{ textAlign: "left" }}>
                        <label
                          style={{
                            fontWeight: "bold",
                            fontSize: "large",
                            color: "#2360a5",
                          }}
                        >
                          Zip
                        </label>
                        <Typography
                          sx={{ fontWeight: "bold", fontFamily: "Poppins" }}
                        >
                          {UserData.zip}
                        </Typography>
                      </div>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Button
                        sx={{
                          fontFamily: "Poppins",
                          fontSize: "1.2rem",
                          fontWeight: "bold",
                          // backgroundColor: "#4285F4",
                          color: "#2360a5",
                          ":hover": {
                            backgroundColor: "#2360a5",
                            color: "#fff",
                          },
                          textTransform: "none",
                          borderRadius: "25px",
                          float: "right",
                        }}
                        size="large"
                        variant="outlined"
                        onClick={() => {
                          navigate("/usersignup", { state: UserData });
                        }}
                      >
                        Update Profile
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </Paper>
            </Grid>
          </Grid>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
