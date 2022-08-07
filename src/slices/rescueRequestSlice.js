import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  rrs: null,
};

//GET ALL RESCUE REQUESTS
export const getAllRR = createAsyncThunk(
  "rrs/getRRS",
  async (_, { getState }) => {
    const state = getState();
    const accessToken = state.appUser.accessToken;

    try {
      const response = await axios.get("http://localhost:3000/rr/getallrr", {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });
      // console.log(response.data);
      return response.data;
    } catch (e) {
      //   console.log(`Error:${e?.response?.data.message}`);
      throw new Error(e?.response?.data?.message);
    }
  }
);

// ACCEPT RESCUE REQUEST
export const acceptRR = createAsyncThunk(
  "rrs/acceptRR",
  async (rrId, { getState }) => {
    const state = getState();
    const { accessToken, user } = state.appUser;
    const acceptdata = {
      id: user._id,
      shelterName: user.s_name,
      _id: rrId,
    };
    try {
      const response = await axios.post(
        `http://localhost:3000/rr/acceptrr`,
        acceptdata,
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (e) {
      //   console.log(`Error:${e?.response?.data.message}`);
      throw new Error(e?.response?.data?.message);
    }
  }
);

//SHOW ACCEPTED SHELTER RESCUE REQUEST

export const shelterSpecificRR = createAsyncThunk(
  "rrs/shelterSpecificRR",
  async (_, { getState }) => {
    const state = getState();
    const { accessToken, user } = state.appUser;
    try {
      const response = await axios.get(`http://localhost:3000/rr/getrr`, {
        params: {
          id: user._id,
        },
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });
      // console.log(response.data);
      return response.data;
    } catch (e) {
      //   console.log(`Error:${e?.response?.data.message}`);
      throw new Error(e?.response?.data?.message);
    }
  }
);

// DELETE RESCUE REQUEST [ADMIN ONLY]

export const deleteRR = createAsyncThunk(
  "rrs/deleteRR",
  async (_id, { getState }) => {
    const state = getState();
    const { accessToken } = state.appUser;
    try {
      const response = await axios.delete(
        `http://localhost:3000/rr/softdeleterr`,
        {
          params: {
            id: _id,
          },
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (e) {
      //   console.log(`Error:${e?.response?.data.message}`);
      throw new Error(e?.response?.data?.message);
    }
  }
);

//UPDATE RESCUE REQUEST [SHELTER ONLY]

export const updateRR = createAsyncThunk(
  "rrs/updateRR",
  async (updateData, { getState }) => {
    const state = getState();
    const { accessToken } = state.appUser;

    try {
      const response = await axios.patch(
        `http://localhost:3000/rr/updaterr`,
        updateData,
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        }
      );
      // console.log(response.data);
      return response.data;
    } catch (e) {
      //   console.log(`Error:${e?.response?.data.message}`);
      throw new Error(e?.response?.data?.message);
    }
  }
);

const rescueRequestSlice = createSlice({
  name: "rrs",
  initialState,
  reducers: {
    resetRRS: (state) => initialState,
    RemoveRescueRequest: (state, action) => {
      state.rrs = state.rrs.filter((rr) => rr._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllRR.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllRR.fulfilled, (state, action) => {
      state.loading = false;
      state.rrs = action.payload.rescuerequests;
    });
    builder.addCase(getAllRR.rejected, (state, action) => {
      state.loading = false;
      state.rrs = null;
    });

    // ===========================================================

    builder.addCase(shelterSpecificRR.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(shelterSpecificRR.fulfilled, (state, action) => {
      state.loading = false;
      state.rrs = action.payload.rescuerequests;
    });
    builder.addCase(shelterSpecificRR.rejected, (state, action) => {
      state.loading = false;
      state.rrs = null;
    });
  },
});

export const { resetRRS, RemoveRescueRequest } = rescueRequestSlice.actions;
export default rescueRequestSlice.reducer;
