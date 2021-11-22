import React, { useState } from "react";
import {
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Stack,
  Collapse,
} from "@mui/material";
import { Box } from "@mui/system";
import {
  AccessTimeFilledOutlined,
  AccountCircle,
  ExpandLess,
  ExpandMore,
  ListAlt,
  TouchApp,
  WorkOff,
} from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  imgBlur: {
    width: "100%",
    height: "10rem",
    objectFit: "cover",
    marginTop: "2rem",
    filter: "blur(12px)",
  },
  img: {
    width: "5rem",
    height: "5rem",
    objectFit: "cover",
    borderRadius: "50%",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    margin: "auto",
  },
});

const SideBar = () => {
  const [open, setOpen] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  const details = useSelector((state) => state.employee.details);
  const classes = useStyles();
  const handleClick = () => {
    setOpen(!open);
  };
  const handleTimeClick = () => {
    setOpenTime(!openTime);
  };
  return (
    <Grid item xs={2} height="100vh">
      <Box p={2}>
        <Typography textAlign="center" variant="h6">
          Tangerine
        </Typography>
        <Box position="relative" margin="auto">
          <img
            className={classes.imgBlur}
            src="https://images.pexels.com/photos/2128819/pexels-photo-2128819.jpeg?cs=srgb&dl=pexels-david-garrison-2128819.jpg&fm=jpg"
            alt="user"
          />
          <img
            className={classes.img}
            src="https://images.pexels.com/photos/2128819/pexels-photo-2128819.jpeg?cs=srgb&dl=pexels-david-garrison-2128819.jpg&fm=jpg"
            alt="user"
          />
          <Stack
            alignItems="center"
            position="absolute"
            left={0}
            right={0}
            marginLeft="auto"
            marginRight="auto"
            bottom="1rem"
            color="primary.contrastText"
          >
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
        </Box>
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            marginTop: "2rem",
          }}
          component="div"
        >
          <Link
            style={{ color: "inherit", textDecoration: "none" }}
            to={`/employee/details`}
          >
            <ListItemButton>
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary="My Info" />
            </ListItemButton>
          </Link>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <WorkOff />
            </ListItemIcon>
            <ListItemText primary="Leave" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link
                style={{ color: "inherit", textDecoration: "none" }}
                to="/employee/leave/apply"
              >
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <TouchApp />
                  </ListItemIcon>
                  <ListItemText primary="Apply" />
                </ListItemButton>
              </Link>
              <Link
                style={{ color: "inherit", textDecoration: "none" }}
                to={`/employee/leave/view/${details._id}`}
              >
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <ListAlt />
                  </ListItemIcon>
                  <ListItemText primary="My Leave" />
                </ListItemButton>
              </Link>
            </List>
          </Collapse>
          <ListItemButton onClick={handleTimeClick}>
            <ListItemIcon>
              <AccessTimeFilledOutlined />
            </ListItemIcon>
            <ListItemText primary="Time" />
            {openTime ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openTime} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link
                style={{ color: "inherit", textDecoration: "none" }}
                to={`/employee/time/myrecord/${details._id}`}
              >
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <TouchApp />
                  </ListItemIcon>
                  <ListItemText primary="My Records" />
                </ListItemButton>
              </Link>
              <Link
                style={{ color: "inherit", textDecoration: "none" }}
                to={`/employee/time/punch_in_out/${details._id}`}
              >
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <ListAlt />
                  </ListItemIcon>
                  <ListItemText primary="Punch In/Out" />
                </ListItemButton>
              </Link>
            </List>
          </Collapse>
        </List>
      </Box>
    </Grid>
  );
};

export default SideBar;
