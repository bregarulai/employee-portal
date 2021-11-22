import { Avatar, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React from "react";
import { useForm, Form } from "../../hooks/useForm";
import Controls from "./../../components/controls/Controls";
import { makeStyles } from "@mui/styles";
import { theme } from "../../theme";
import { useDispatch } from "react-redux";
import { login } from "../../redux/employeeSlice";
import { useNavigate } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    "& .MuiFormControl-root": {
      width: "100%",
      margin: theme.spacing(2),
    },
  },
  btn: {
    width: "100%",
    margin: theme.spacing(2),
  },
}));

const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      {/* <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{" "} */}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const SignIn = () => {
  const classes = useStyles();
  const initialValues = {
    email: "",
    password: "",
  };

  const { values, handleInputChange, errors } = useForm(initialValues);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(login(values));
    localStorage.setItem("token", res.payload.token);
    localStorage.setItem("employeeId", res.payload.info._id);
    navigate(`/employee/details`, { replace: true });
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 16,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          component="h1"
          variant="h3"
          mb={theme.spacing(4)}
          color="primary.dark"
        >
          Tangerine
        </Typography>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" color="text.secondary">
          Sign in
        </Typography>
        <Form className={classes.root}>
          <Controls.Input
            name="email"
            label="Email"
            value={values.email}
            error={errors.email}
            onChange={handleInputChange}
            type="email"
          />
          <Controls.Input
            name="password"
            label="Password"
            value={values.password}
            error={errors.password}
            onChange={handleInputChange}
            type="password"
          />
          <Controls.Button
            type="submit"
            text="Sign In"
            onClick={handleSubmit}
            className={classes.btn}
          />
        </Form>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default SignIn;
