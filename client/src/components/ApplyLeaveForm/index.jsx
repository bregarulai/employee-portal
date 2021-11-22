import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Controls from "../controls/Controls";
import { useForm, Form } from "./../../hooks/useForm";
import { makeStyles } from "@mui/styles";
import { createEndPoints, EndPoints } from "../../api";
import { useDispatch } from "react-redux";
import { createLeave } from "./../../redux/employeeSlice";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  commentInput: {
    width: "93% !important",
  },
}));

const ApplyLeaveForm = () => {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const details = useSelector((state) => state.employee.details);
  const initialValues = {
    employeeId: details._id,
    leaveTypeId: "",
    fromDate: new Date(),
    toDate: null,
    comment: "",
  };

  const classes = useStyles();
  const { values, resetForm, errors, handleInputChange } =
    useForm(initialValues);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await createEndPoints(EndPoints.LEAVE_TYPE).fetchAll();
        setLeaveTypes(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTypes();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createLeave(values));
    resetForm();
  };
  return (
    <Form>
      <Grid container>
        <Grid item xs={4}>
          <Controls.Select
            name="leaveTypeId"
            label="Leave Type"
            value={values.leaveTypeId}
            onChange={handleInputChange}
            errors={errors.leaveType}
            options={leaveTypes}
          />
        </Grid>
        <Grid item xs={4}>
          <Controls.DatePicker
            name="fromDate"
            label="From Date"
            value={values.fromDate}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={4}>
          <Controls.DatePicker
            name="toDate"
            label="To Date"
            value={values.toDate}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Controls.Input
            name="comment"
            label="Comment"
            value={values.comment}
            onChange={handleInputChange}
            error={errors.comment}
            className={classes.commentInput}
          />
        </Grid>
        <Grid item xs={12}>
          <Controls.Button type="submit" text="Apply" onClick={handleSubmit} />
        </Grid>
      </Grid>
    </Form>
  );
};

export default ApplyLeaveForm;
