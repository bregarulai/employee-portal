import { Grid, Typography } from "@mui/material";
import Moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { createEndPoints, EndPoints } from "../../api";
import { Form, useForm } from "../../hooks/useForm";
import { theme } from "../../theme";
import Controls from "../controls/Controls";
import { updateAttendance } from "./../../redux/employeeSlice";

const PunchOutForm = ({ setClockedIn }) => {
  //   const attendances = useSelector((state) => state.employee.attendaces);
  const details = useSelector((state) => state.employee.details);
  const [punchedIn, setPunchedIn] = useState({});

  //   const latestEntry = attendances.filter((e) => e.punchOutTime === undefined);
  //   const entryObj = latestEntry[0];

  const attendanceInitialValues = {
    _id: punchedIn._id,
    punchOutTime: new Date(),
    punchOutNote: "",
  };

  const { values, errors, handleInputChange } = useForm(
    attendanceInitialValues
  );

  useEffect(() => {
    const fetchLatesPunchin = async () => {
      try {
        const res = await createEndPoints(EndPoints.ATTENDANCE).fetchById(
          details._id
        );

        setPunchedIn(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchLatesPunchin();
  }, [details._id]);
  //   useEffect(() => {
  //     setValues(attendanceInitialValues);
  //   }, [setValues, entryObj?._id]);
  const dispatch = useDispatch();

  const handlePunchOut = (e) => {
    e.preventDefault();
    dispatch(updateAttendance(values));
    setClockedIn(false);
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
        Punch Out
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
          sx={{
            fontWeight: theme.typography.fontWeightMedium,
            marginBottom: theme.spacing(1),
          }}
        >
          Punched in Time
        </Grid>
        <Grid item xs={10}>
          {Moment(punchedIn.punchInTime).format("MM-DD-YYYY hh:mm A")}
        </Grid>
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
              name="punchOutNote"
              label="Note"
              value={values.punchOutNote}
              onChange={handleInputChange}
              error={errors.punchOutNote}
            />
          </Grid>
          <Grid item xs={12}>
            <Controls.Button
              type="submit"
              text="OUT"
              onClick={handlePunchOut}
            />
          </Grid>
        </Grid>
      </Form>
    </>
  );
};

export default PunchOutForm;
