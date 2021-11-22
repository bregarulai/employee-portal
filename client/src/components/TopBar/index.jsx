import { LogoutOutlined, Person } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  IconButton,
  Link as MuiLink,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { theme } from "../../theme";

const TopBar = ({ setUserId }) => {
  const details = useSelector((state) => state.employee.details);
  const navigate = useNavigate();
  const handleSignout = () => {
    localStorage.clear();
    setUserId({});
    navigate("/signin");
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2 }}
        >
          <Avatar
            alt="user"
            src="https://images.pexels.com/photos/2128819/pexels-photo-2128819.jpeg?cs=srgb&dl=pexels-david-garrison-2128819.jpg&fm=jpg"
          />
        </IconButton>
        <Stack>
          <Typography
            variant="body1"
            component="span"
            sx={{ textTransform: "capitalize" }}
          >
            {`${details.firstName} ${details.lastName}`}
          </Typography>
          <Typography
            variant="body2"
            component="span"
            fontWeight={300}
            sx={{ textTransform: "capitalize" }}
          >
            {details.title}
          </Typography>
        </Stack>

        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: "none", md: "flex", alignItems: "center" } }}>
          <MuiLink
            color="inherit"
            underline="none"
            component="button"
            variant="body2"
            onClick={() => {
              console.info("I'm a button.");
            }}
          >
            <Stack direction="row" color="inherit" spacing={1}>
              <Person />
              <Typography variant="body1" component="span">
                Personal Details
              </Typography>
            </Stack>
          </MuiLink>

          <MuiLink
            color="inherit"
            underline="none"
            component="button"
            variant="body2"
            onClick={handleSignout}
          >
            <Stack
              direction="row"
              color="inherit"
              spacing={1}
              sx={{ marginLeft: theme.spacing(2) }}
            >
              <LogoutOutlined />
            </Stack>
          </MuiLink>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
