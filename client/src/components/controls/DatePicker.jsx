import { LocalizationProvider } from "@mui/lab";
import React from "react";

import { TextField } from "@mui/material";
import AdapterMoment from "@mui/lab/AdapterMoment";
import { DatePicker as MuiDatePicker } from "@mui/lab";

const DatePicker = (props) => {
  const { name, label, value, onChange, ...other } = props;

  const convertToDefaultEventParam = (name, value) => ({
    target: {
      name,
      value,
    },
  });
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <MuiDatePicker
        label={label}
        format="MMM/dd/yyyy"
        value={value}
        onChange={(date) => {
          onChange(convertToDefaultEventParam(name, date));
        }}
        renderInput={(props) => <TextField {...props} />}
        {...other}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
