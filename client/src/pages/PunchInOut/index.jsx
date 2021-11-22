import React, { useEffect, useState } from "react";
import { Grid, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { theme } from "../../theme";
import PunchInForm from "./../../components/PunchInForm/index";
import PunchOutForm from "../../components/PunchOutForm";
import { useParams } from "react-router";
import { createEndPoints, EndPoints } from "../../api";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  table: {
    marginTop: theme.spacing(2),
  },
}));

const PunchInOut = () => {
  const [punchedIn, setPunchedIn] = useState({});
  const params = useParams();
  const [clockedIn, setClockedIn] = useState(
    punchedIn?.punchInTime ? false : true
  );
  const classes = useStyles();

  useEffect(() => {
    const fetchLatesPunchin = async () => {
      try {
        const res = await createEndPoints(EndPoints.ATTENDANCE).fetchById(
          params.employeeId
        );
        setPunchedIn(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchLatesPunchin();
  }, [params.employeeId]);

  return (
    <Grid
      padding={theme.spacing(3)}
      bgcolor="#f0f2fc"
      sx={{ height: "calc(100vh - 64px)" }}
    >
      <Paper elevation={3} className={classes.paper}>
        {clockedIn ? (
          <PunchOutForm {...{ setClockedIn }} />
        ) : (
          <PunchInForm {...{ setClockedIn }} />
        )}
      </Paper>
    </Grid>
  );
};

export default PunchInOut;
