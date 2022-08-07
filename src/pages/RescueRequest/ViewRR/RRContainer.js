import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Grid } from "@mui/material";
import Dialogue from "../../../components/Dialogue/Dialogue";
import RRCard from "./RRCard";
import {
  getAllRR,
  shelterSpecificRR,
} from "../../../slices/rescueRequestSlice";

const RRContainer = ({ type }) => {
  const [open, setOpen] = React.useState(false);
  const [DialogMessage, setDialogueMessage] = useState("");
  const [DialogTitle, setDialogTitle] = useState("");

  const setDialogueOpen = (title, message) => {
    setDialogTitle(title);
    setDialogueMessage(message);
    setOpen(true);
  };

  const { loading, rrs } = useSelector((state) => state.rescueRequest);
  const { userType } = useSelector((state) => state.appUser);
  const dispatch = useDispatch();

  console.log("RRContainer", rrs);

  useEffect(() => {
    if (type === "ALL") {
      dispatch(getAllRR())
        .unwrap()
        .catch((e) => {
          console.log(e);
          setDialogueOpen("Error", e.message);
        });
    }
    if (type === "SHELTER") {
      dispatch(shelterSpecificRR())
        .unwrap()
        .catch((e) => {
          console.log(e);
          setDialogueOpen("Error", e.message);
        });
    }
  }, [dispatch, type]);

  return (
    <div style={{ marginTop: "1rem" }}>
      {loading && (
        <div>
          <div> Loading..</div>
          <CircularProgress />
        </div>
      )}
      {!loading && rrs?.length ? (
        <div style={{ margin: "2rem" }}>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
            sx={{
              flexDirection: "row-reverse",
            }}
          >
            {rrs.map((rr, i) =>
              type === "ALL" ? (
                rr.acceptedBy && userType === "SHELTER" ? null : (
                  <>
                    <Grid
                      item
                      key={rr._id}
                      xs={12}
                      md={6}
                      lg={3}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <RRCard key={rr.id} rr={rr} />
                    </Grid>
                  </>
                )
              ) : (
                <>
                  <Grid
                    item
                    key={rr._id}
                    xs={12}
                    md={6}
                    lg={3}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <RRCard key={rr.id} rr={rr} />
                  </Grid>
                </>
              )
            )}
          </Grid>
        </div>
      ) : (
        <h1>NO Rescue Request To Show!</h1>
      )}

      <Dialogue
        title={DialogTitle}
        message={DialogMessage}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};

export default RRContainer;
