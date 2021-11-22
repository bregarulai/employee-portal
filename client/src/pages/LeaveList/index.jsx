import {
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { theme } from "../../theme";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getLeaves } from "../../redux/employeeSlice";
import { useSelector } from "react-redux";
import Moment from "moment";
import { CommentOutlined } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  tableContainer: {
    marginTop: theme.spacing(3),
  },
  table: {
    marginTop: theme.spacing(2),
  },
}));

const LeaveList = () => {
  const classes = useStyles();

  const params = useParams();
  const dispatch = useDispatch();
  const leaves = useSelector((state) => state.employee.leaves);

  useEffect(() => {
    dispatch(getLeaves(params.id));
  }, [params, dispatch]);
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
          My Leaves
        </Typography>
      </Paper>
      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table className={classes.table} sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell align="center">Employee</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Leave Type</TableCell>
              <TableCell align="center">Net Leave Balance</TableCell>
              <TableCell align="center">Number of Days</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Comment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaves.map((leave) => (
              <TableRow
                key={leave._id}
                sx={{ "&:last-child td, &:last-child": { boder: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ textTransform: "capitalize" }}
                >
                  {leave.name}
                </TableCell>
                <TableCell align="center">
                  {leave.toDate
                    ? `${Moment(leave.fromDate).format(
                        "MM-DD-YYYY"
                      )} to ${Moment(leave.toDate).format("MM-DD-YYYY")}`
                    : Moment(leave.fromDate).format("MM-DD-YYYY")}
                </TableCell>
                <TableCell align="center">{leave.type}</TableCell>
                <TableCell align="center">NA</TableCell>
                <TableCell align="center">
                  {leave.toDate
                    ? Math.floor(
                        (Date.parse(leave.toDate) -
                          Date.parse(leave.fromDate)) /
                          86400000
                      )
                    : "1"}
                </TableCell>
                <TableCell align="center" sx={{ textTransform: "capitalize" }}>
                  {leave.status}
                </TableCell>
                <TableCell align="center">
                  <Tooltip title={leave.comment}>
                    <IconButton>
                      <CommentOutlined />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default LeaveList;
