import React, { useEffect } from "react";
import {
  Grid,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { theme } from "./../../theme";
import { makeStyles } from "@mui/styles";
import PersonalDetailsForm from "../../components/PersonalDetailsForm";
import { Box } from "@mui/system";
import Controls from "./../../components/controls/Controls";
import { useDispatch } from "react-redux";
import { fetchDetails } from "../../redux/employeeSlice";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  table: {
    marginTop: theme.spacing(2),
  },
}));

const PersonalDetails = () => {
  const employeeId = localStorage.getItem("employeeId");
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDetails(employeeId));
  }, [dispatch, employeeId]);

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
          Personal Details
        </Typography>
        <PersonalDetailsForm />
      </Paper>

      <Paper
        sx={{ marginTop: theme.spacing(3) }}
        elevation={3}
        className={classes.paper}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography
            color="text.secondary"
            variant="subtitle1"
            sx={{
              fontWeight: theme.typography.fontWeightMedium,
            }}
          >
            Attachments
          </Typography>
          <Typography color="text.secondary" variant="body2">
            0 records found
          </Typography>
          <Controls.Button type="text" text="Add" />
        </Box>
        <TableContainer component={Paper} className={classes.table}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>File Name</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Size</TableCell>
                <TableCell align="right">Type</TableCell>
                <TableCell align="right">Date Added</TableCell>
                <TableCell align="right">Added By</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </Paper>
    </Grid>
  );
};

export default PersonalDetails;
