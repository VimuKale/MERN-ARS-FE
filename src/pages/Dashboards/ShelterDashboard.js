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

const ShelterDashboard = () => {
  const [shelterData, setShelterData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user, accessToken } = useSelector((state) => state.appUser);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeNavUser("shelter"));
    axios
      .get("http://localhost:3000/shelters/shelter", {
        params: {
          id: user._id,
        },
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setShelterData(response.data.payload);
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

        {!shelterData && <CircularProgress />}

        {shelterData && (
          <Grid
            container
            sx={{
              width: "70%",
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
                sx={{
                  padding: "2rem",
                  borderRadius: "25px",
                  // border: "5px solid #2360a5",
                }}
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
                    // color: "#4285F4",
                    color: "#2360a5",
                  }}
                >
                  Shelter Dashboard
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
                            // color: "#4285F4",
                            color: "#2360a5",
                          }}
                        >
                          Shelter Name
                        </label>
                        <Typography
                          sx={{ fontWeight: "bold", fontFamily: "Poppins" }}
                        >
                          {shelterData.s_name}
                        </Typography>
                      </div>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <div style={{ textAlign: "left" }}>
                        <label
                          style={{
                            fontWeight: "bold",
                            fontSize: "large",
                            // color: "#4285F4",
                            color: "#2360a5",
                          }}
                        >
                          Shelter Category
                        </label>
                        <Typography
                          sx={{ fontWeight: "bold", fontFamily: "Poppins" }}
                        >
                          {shelterData.s_category}
                        </Typography>
                      </div>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <div style={{ textAlign: "left" }}>
                        <label
                          style={{
                            fontWeight: "bold",
                            fontSize: "large",
                            // color: "#4285F4",
                            color: "#2360a5",
                          }}
                        >
                          Email
                        </label>
                        <Typography
                          sx={{ fontWeight: "bold", fontFamily: "Poppins" }}
                        >
                          {shelterData.email}
                        </Typography>
                      </div>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <div style={{ textAlign: "left" }}>
                        <label
                          style={{
                            fontWeight: "bold",
                            fontSize: "large",
                            // color: "#4285F4",
                            color: "#2360a5",
                          }}
                        >
                          Phone
                        </label>
                        <Typography
                          sx={{ fontWeight: "bold", fontFamily: "Poppins" }}
                        >
                          +91 {shelterData.s_phone}
                        </Typography>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <div style={{ textAlign: "left" }}>
                        <label
                          style={{
                            fontWeight: "bold",
                            fontSize: "large",
                            // color: "#4285F4",
                            color: "#2360a5",
                          }}
                        >
                          Address
                        </label>
                        <Typography
                          sx={{ fontWeight: "bold", fontFamily: "Poppins" }}
                        >
                          {shelterData.s_address}
                        </Typography>
                      </div>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <div style={{ textAlign: "left" }}>
                        <label
                          style={{
                            fontWeight: "bold",
                            fontSize: "large",
                            // color: "#4285F4",
                            color: "#2360a5",
                          }}
                        >
                          City
                        </label>
                        <Typography
                          sx={{ fontWeight: "bold", fontFamily: "Poppins" }}
                        >
                          {shelterData.s_city}
                        </Typography>
                      </div>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <div style={{ textAlign: "left" }}>
                        <label
                          style={{
                            fontWeight: "bold",
                            fontSize: "large",
                            // color: "#4285F4",
                            color: "#2360a5",
                          }}
                        >
                          State
                        </label>
                        <Typography
                          sx={{ fontWeight: "bold", fontFamily: "Poppins" }}
                        >
                          {shelterData.s_state}
                        </Typography>
                      </div>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <div style={{ textAlign: "left" }}>
                        <label
                          style={{
                            fontWeight: "bold",
                            fontSize: "large",
                            // color: "#4285F4",
                            color: "#2360a5",
                          }}
                        >
                          Zip
                        </label>
                        <Typography
                          sx={{ fontWeight: "bold", fontFamily: "Poppins" }}
                        >
                          {shelterData.s_zip}
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
                          border: "1px solid #2360a5",
                          float: "right",
                        }}
                        size="large"
                        variant="outlined"
                        onClick={() => {
                          navigate("/sheltersignup", { state: shelterData });
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

export default ShelterDashboard;
