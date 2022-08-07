import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import { Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import LoadingButton from "@mui/lab/LoadingButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useDispatch } from "react-redux";
import {
  shelterSpecificRR,
  updateRR,
} from "../../../../slices/rescueRequestSlice";

const UpdateDialogue = ({ status, _id }) => {
  const [updatedStatus, setUpdatedStatus] = useState(status);
  const [loading, setLoading] = useState(false);
  const [Error, setError] = useState(false);
  const dispatch = useDispatch();

  const handleOnSubmit = () => {
    setLoading(true);
    const updateDetails = {
      _id: _id,
      status: updatedStatus,
    };
    dispatch(updateRR(updateDetails))
      .unwrap()
      .then((result) => {
        dispatch(shelterSpecificRR());
      })
      .catch((e) => {
        setError(e.message);
      });
  };
  return (
    <div>
      <Typography
        sx={{
          fontFamily: "Poppins",
          fontSize: "0.8rem",
          color: "#666666",
        }}
      >
        Changing Status Will Send A Currently Updated Status Email To The
        Reporting User*
      </Typography>
      <br />
      <FormControl fullWidth>
        <InputLabel
          id="demo-simple-select-label"
          sx={{ fontFamily: "Poppins" }}
        >
          Rescue Request Status
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={updatedStatus}
          label="Rescue Request Status"
          sx={{ textAlign: "left", fontFamily: "Poppins" }}
          onChange={(e) => {
            setUpdatedStatus(e.target.value);
          }}
        >
          <MenuItem value={"pending"}>Pending</MenuItem>
          <MenuItem value={"processing"}>Processing</MenuItem>
          <MenuItem value={"onHold"}>On-Hold</MenuItem>
          <MenuItem value={"resolved"}>Resolved</MenuItem>
        </Select>
        <FormHelperText sx={{ fontFamily: "Poppins" }}>
          Select Rescue Request Status*
        </FormHelperText>
      </FormControl>

      {Error && <h5>{Error}</h5>}

      {/* ================== */}
      <LoadingButton
        loading={loading}
        loadingPosition="start"
        startIcon={<EditOutlinedIcon />}
        variant="contained"
        onClick={handleOnSubmit}
        size="large"
        sx={{
          borderRadius: "25px",
          backgroundColor: "#388e3c",
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
        Update Status
      </LoadingButton>
    </div>
  );
};

export default UpdateDialogue;
