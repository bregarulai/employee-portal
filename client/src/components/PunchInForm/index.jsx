import React from "react";
import Moment from "moment";
import { Form, useForm } from "../../hooks/useForm";
import { Grid, Typography } from "@mui/material";
import Controls from "../controls/Controls";
import { theme } from "../../theme";
import { useDispatch, useSelector } from "react-redux";
import { createAttendance } from "../../redux/employeeSlice";

const PunchInForm = ({ setClockedIn }) => {
  const details = useSelector((state) => state.employee.details);

  const attendanceInitialValues = {
    employeeId: details._id,
    note: "",
  };

  const { values, errors, handleInputChange } = useForm(
    attendanceInitialValues
  );

  const dispatch = useDispatch();

  const handlePunchIn = (e) => {
    e.preventDefault();
    dispatch(createAttendance(values));
    setClockedIn(true);
  };
  return (
    <>
      <Typography
        color="text.secondary"
        variant="subtitle1"
        sx={{
          fontWeight: theme.typography.fontWeightMedium,
        }}
      >
        Punch In
      </Typography>
      <Grid
        container
        sx={{
          marginTop: theme.spacing(2),
          marginBottom: theme.spacing(2),
          marginLeft: theme.spacing(1),
        }}
      >
        <Grid
          item
          xs={2}
          sx={{ fontWeight: theme.typography.fontWeightMedium }}
        >
          Date
        </Grid>
        <Grid item xs={10}>
          {Moment(new Date()).format("MM-DD-YYYY")}
        </Grid>
        <Grid
          item
          xs={2}
          sx={{ fontWeight: theme.typography.fontWeightMedium }}
        >
          Time
        </Grid>
        <Grid item xs={10}>
          {Moment(new Date()).format("hh:mm A")}
        </Grid>
      </Grid>
      <Form>
        <Grid container>
          <Grid item xs={12}>
            <Controls.Input
              name="note"
              label="Note"
              value={values.note}
              onChange={handleInputChange}
              error={errors.note}
            />
          </Grid>
          <Grid item xs={12}>
            <Controls.Button type="submit" text="IN" onClick={handlePunchIn} />
          </Grid>
        </Grid>
      </Form>
    </>
  );
};

export default PunchInForm;
