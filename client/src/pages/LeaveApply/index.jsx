import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { theme } from "./../../theme";
import { makeStyles } from "@mui/styles";
import ApplyLeaveForm from "./../../components/ApplyLeaveForm/index";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  table: {
    marginTop: theme.spacing(2),
  },
}));

const LeaveApply = () => {
  const classes = useStyles();
  return (
    <Grid
      padding={theme.spacing(3)}
      bgcolor="#f0f2fc"
      sx={{ height: "calc(100vh - 64px)" }}
    >
      <Paper elevation={3} className={classes.paper}>
        <Typography
          color="text.secondary"
          variant="subtitle1"
          sx={{
            fontWeight: theme.typography.fontWeightMedium,
          }}
        >
          Apply Leave
        </Typography>
        <ApplyLeaveForm />
      </Paper>
    </Grid>
  );
};

export default LeaveApply;
