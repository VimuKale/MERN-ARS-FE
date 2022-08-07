import LoadingButton from "@mui/lab/LoadingButton";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteRR,
  RemoveRescueRequest,
} from "../../../../slices/rescueRequestSlice";

import Dialogue from "../../../../components/Dialogue/Dialogue";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const DeleteButton = ({ _id }) => {
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = React.useState(false);
  const [DialogMessage, setDialogueMessage] = useState("");
  const [DialogTitle, setDialogTitle] = useState("");

  const setDialogueOpen = (title, message) => {
    setDialogTitle(title);
    setDialogueMessage(message);
    setOpen(true);
  };

  const dispatch = useDispatch();

  const handleOnSubmit = () => {
    setLoading(true);
    dispatch(deleteRR(_id))
      .unwrap()
      .then((result) => {
        setLoading(false);
        setDialogueOpen("Success", "Rescue Request Deleted");
        dispatch(RemoveRescueRequest(_id));
      })
      .catch((e) => {
        setLoading(false);
        setDialogueOpen("Error", e.message);
      });
  };

  return (
    <div>
      <LoadingButton
        loading={loading}
        loadingPosition="start"
        startIcon={<DeleteForeverIcon />}
        variant="contained"
        onClick={handleOnSubmit}
        size="large"
        sx={{
          borderRadius: "25px",
          backgroundColor: "#d32f2f",
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
        DELETE REQ.
      </LoadingButton>
      <Dialogue
        title={DialogTitle}
        message={DialogMessage}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};

export default DeleteButton;
