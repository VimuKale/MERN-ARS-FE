import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  user: null,
  accessToken: null,
  userType: null,
};

//LOGIN USER
export const LoginAppUser = createAsyncThunk(
  "appUser/LoginAppUser",
  async (loginDetails) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        loginDetails
      );
      return response.data;
    } catch (e) {
      // console.log(`Error:${e?.response?.data.message}`);
      throw new Error(e?.response?.data.message);
    }
  }
);

const appUserSlice = createSlice({
  name: "appUser",
  initialState,
  reducers: {
    resetAppUser: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(LoginAppUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(LoginAppUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.payload;
      state.accessToken = action.payload.accessToken;
      state.userType = action.payload.payload.user_type;
    });
    builder.addCase(LoginAppUser.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.accessToken = null;
    });
  },
});

export const { resetAppUser } = appUserSlice.actions;
export default appUserSlice.reducer;
