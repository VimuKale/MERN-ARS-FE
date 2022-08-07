import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
};

// REGISTER USER
export const RegisterAppUser = createAsyncThunk(
  "appUser/RegisterAppUser",
  async (registerDetails) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users/signup",
        registerDetails
      );
      return response.data;
    } catch (e) {
      // console.log(`Error:${e?.response?.data.message}`);
      throw new Error(e?.response?.data.message);
    }
  }
);

// UPDATE USER
export const UpdateAppUser = createAsyncThunk(
  "appUser/UpdateAppUser",
  async (updateDetails, { getState }) => {
    const state = getState();
    const { accessToken, user } = state.appUser;

    try {
      const response = await axios.patch(
        "http://localhost:3000/users/edit",
        updateDetails,
        {
          params: {
            id: user._id,
          },
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (e) {
      // console.log(`Error:${e?.response?.data.message}`);
      throw new Error(e?.response?.data.message);
    }
  }
);

// REGISTER SHELTER
export const RegisterShelter = createAsyncThunk(
  "appUser/RegisterShelter",
  async (registerDetails) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/shelters/signup",
        registerDetails
      );
      return response.data;
    } catch (e) {
      // console.log(`Error:${e?.response?.data.message}`);
      console.log(e);
      throw new Error(e?.response?.data.message);
    }
  }
);

// UPDATE SHELTER
export const UpdateShelter = createAsyncThunk(
  "appUser/UpdateShelter",
  async (shelterDetails, { getState }) => {
    const state = getState();
    const { accessToken, user } = state.appUser;

    try {
      const response = await axios.patch(
        "http://localhost:3000/shelters/edit",
        shelterDetails,
        {
          params: {
            id: user._id,
          },
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (e) {
      // console.log(`Error:${e?.response?.data.message}`);
      throw new Error(e?.response?.data.message);
    }
  }
);

// REGISTER ADMIN
export const RegisterAppAdmin = createAsyncThunk(
  "appUser/RegisterAppUser",
  async (registerDetails) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/admins/signup",
        registerDetails
      );
      return response.data;
    } catch (e) {
      // console.log(`Error:${e?.response?.data.message}`);
      throw new Error(e?.response?.data.message);
    }
  }
);

// UPDATE ADMIN
export const UpdateAppAdmin = createAsyncThunk(
  "appUser/UpdateAppAdmin",
  async (updateDetails, { getState }) => {
    const state = getState();
    const { accessToken, user } = state.appUser;

    try {
      const response = await axios.patch(
        "http://localhost:3000/admins/edit",
        updateDetails,
        {
          params: {
            id: user._id,
          },
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (e) {
      // console.log(`Error:${e?.response?.data.message}`);
      throw new Error(e?.response?.data.message);
    }
  }
);

const uruSlice = createSlice({
  name: "appbar",
  initialState,
  reducers: {
    resetURU: (state) => initialState,
  },
});

export const { resetURU } = uruSlice.actions;
export default uruSlice.reducer;
