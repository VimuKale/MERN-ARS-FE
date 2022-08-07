import React from "react";
import "./RRCard.css";
import { useSelector } from "react-redux";
import AcceptButton from "./AcceptButton/AcceptButton";
import DeleteButton from "./DeleteButton/DeleteButton";
import UpdateButton from "./UpdateButton/UpdateButton";
import { IconButton } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

const RRCard = ({ rr }) => {
  const {
    _id,
    animal_type,
    r_loc,
    r_landmark,
    r_description,
    r_city,
    r_state,
    r_zip,
    photo,
    status,
    createdAt,
    acceptedBy,
    requestBy,
  } = rr;

  const { userType } = useSelector((state) => state.appUser);
  let params = `scrollbars=no,resizable=yes,status=no,location=no,toolbar=no,menubar=no,
width=600,height=600,left=100,top=100`;

  return (
    <div>
      <div className="card">
        <a
          href={`http://localhost:3000/images/${photo}`}
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={`http://localhost:3000/images/${photo}`}
            alt="Rick and Morty Character"
            className="img-image"
          />
        </a>
        <span className="status-green">{status}</span>
        <div className="card-info" style={{ marginTop: ".5rem" }}>
          <span className="text-title" style={{ color: "#2360a5" }}>
            {animal_type}
          </span>
          <IconButton
            sx={{ float: "right", color: "#2360a5" }}
            onClick={() => {
              window.open(`mailto:${requestBy.email}`, "test", params);
            }}
          >
            <EmailIcon />
          </IconButton>
          <IconButton
            sx={{ float: "right", color: "#2360a5" }}
            href={`tel:${requestBy.phone}`}
          >
            <PhoneIcon />
          </IconButton>
          <p className="text-body">
            <span className="rr-card-points">Location: </span>
            <br />
            {r_loc}
            <br />
            <span className="rr-card-points">Landmark: </span>
            <br />
            {r_landmark}
            <br />
            <span className="rr-card-points">Description: </span>
            <br />
            {r_description}
            <br />
            <span className="rr-card-points">CSZ: </span>
            <br />
            {r_city}, {r_state}, {r_zip}
            <br />
            <span className="rr-card-points">CreatedAt: </span>
            <br />
            {createdAt}
          </p>
          {userType === "SHELTER" && !acceptedBy && <AcceptButton _id={_id} />}
          {userType === "SHELTER" && acceptedBy && (
            <UpdateButton _id={_id} status={status} />
          )}
          {userType === "ADMIN" && <DeleteButton _id={_id} />}
        </div>

        {/* <div className="card-footer"></div> */}
      </div>
      {/* <Dialogue
        title={DialogTitle}
        message={DialogMessage}
        open={open}
        setOpen={setOpen}
      /> */}
    </div>
  );
};

export default RRCard;
