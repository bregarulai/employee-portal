import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import Controls from "../controls/Controls";
import { Form, useForm } from "./../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { updateDetails } from "../../redux/employeeSlice";

const genderItems = [
  { id: "1", title: "Male" },
  { id: "2", title: "Female" },
  { id: "3", title: "Other" },
];
const maritalStatuses = [
  { id: "1", title: "Single" },
  { id: "2", title: "Married" },
  { id: "3", title: "Other" },
];

const PersonalDetailsForm = () => {
  const details = useSelector((state) => state.employee.details);
  const { values, setValues, errors, handleInputChange } = useForm(details);
  const dispatch = useDispatch();
  useEffect(() => {
    setValues({ ...details });
  }, [dispatch, setValues, details]);

  const handleSave = (e) => {
    e.preventDefault();
    dispatch(updateDetails(values));
  };

  return (
    <Form>
      <Grid container>
        <Grid item xs={4}>
          <Controls.Input
            name="firstName"
            label="First Name"
            value={values.firstName}
            onChange={handleInputChange}
            error={errors.firstName}
          />
        </Grid>
        <Grid item xs={4}>
          <Controls.Input
            name="middleName"
            label="Middle Name"
            value={values.middleName}
            onChange={handleInputChange}
            error={errors.middleName}
          />
        </Grid>
        <Grid item xs={4}>
          <Controls.Input
            name="lastName"
            label="Last Name"
            value={values.lastName}
            onChange={handleInputChange}
            error={errors.lastName}
          />
        </Grid>
        <Grid item xs={4}>
          <Controls.DatePicker
            name="dateOfBirth"
            label="Date of Birth"
            value={values.dateOfBirth}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={4}>
          <Controls.Select
            name="maritalStatus"
            label="Marital Status"
            value={values.maritalStatus}
            onChange={handleInputChange}
            error={errors.maritalStatus}
            options={maritalStatuses}
          />
        </Grid>
        <Grid item xs={4}>
          <Controls.Select
            name="gender"
            label="Gender"
            value={values.gender}
            onChange={handleInputChange}
            error={errors.gender}
            options={genderItems}
          />
        </Grid>
        <Grid item xs={12}>
          <Controls.Button type="submit" text="Save" onClick={handleSave} />
        </Grid>
      </Grid>
    </Form>
  );
};

export default PersonalDetailsForm;
