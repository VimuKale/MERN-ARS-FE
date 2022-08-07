import LoadingButton from "@mui/lab/LoadingButton";

import React, { useState } from "react";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

import UpdateDialogue from "./UpdateDialogue";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  margin: "auto",
  transform: "translate(-50%, -50%)",
  // width: 400,
  width: { xs: "70%", md: "100%" },
  maxWidth: 400,
  bgcolor: "background.paper",
  border: "2px solid transparent",
  borderRadius: "25px",
  boxShadow: 24,
  p: 4,
};

const UpdateButton = ({ _id, status }) => {
  const [loading, setLoading] = useState(false);

  // const [open, setOpen] = React.useState(false);
  // const [DialogMessage, setDialogueMessage] = useState("");
  // const [DialogTitle, setDialogTitle] = useState("");

  // const setDialogueOpen = (title, message) => {
  //   setDialogTitle(title);
  //   setDialogueMessage(message);
  //   setOpen(true);
  // };

  const [open, setOpen] = useState(false);

  const openDilog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnSubmit = () => {
    setLoading(true);
    openDilog();
    setLoading(false);
  };

  return (
    <div>
      <LoadingButton
        loading={loading}
        loadingPosition="start"
        startIcon={<EditOutlinedIcon />}
        variant="outlined"
        onClick={handleOnSubmit}
        size="large"
        sx={{
          borderRadius: "25px",
          // backgroundColor: "#388e3c",
          // backgroundColor: "#2360a5",
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
        UPDATE
      </LoadingButton>
      {/* <Dialogue
        title={DialogTitle}
        message={DialogMessage}
        open={open}
        setOpen={setOpen}
      /> */}

      {/* ===================================== */}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <UpdateDialogue status={status} _id={_id} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default UpdateButton;
