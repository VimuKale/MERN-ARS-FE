import LoadingButton from "@mui/lab/LoadingButton";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { acceptRR } from "../../../../slices/rescueRequestSlice";
import { useNavigate } from "react-router-dom";
import Dialogue from "../../../../components/Dialogue/Dialogue";
import SwipeRightIcon from "@mui/icons-material/SwipeRight";

const AcceptButton = ({ _id }) => {
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
  const navigate = useNavigate();

  const handleOnSubmit = () => {
    setLoading(true);
    dispatch(acceptRR(_id))
      .unwrap()
      .then((result) => {
        setLoading(false);
        navigate("/acceptedreq");
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
        startIcon={<SwipeRightIcon />}
        variant="outlined"
        onClick={handleOnSubmit}
        size="large"
        sx={{
          borderRadius: "25px",
          // backgroundColor: "#2360a5",
          color: "#2360a5",
          textTransform: "none",
          fontSize: "large",
          fontWeight: "bolder",
          fontFamily: "Poppins",
        }}
        style={{
          // marginTop: "1rem",
          width: "100%",
        }}
      >
        Accept
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

export default AcceptButton;
