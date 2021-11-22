import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { theme } from "../../theme";
import Controls from "../../components/controls/Controls";
import Moment from "moment";
import { useParams } from "react-router";
import { createEndPoints, EndPoints } from "../../api";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  table: {
    marginTop: theme.spacing(2),
  },
}));

const MyRecords = () => {
  const classes = useStyles();
  const [date, setDate] = useState(new Date());
  const [attendances, setAttendances] = useState([]);
  const params = useParams();
  useEffect(() => {
    const fetchAttendanceByDate = async () => {
      try {
        const res = await createEndPoints(
          `${EndPoints.ATTENDANCE_ALL_EMPLOYEE_ID}/${
            params.employeeId
          }?date=${date.toString()}`
        ).fetchAll();
        setAttendances(
          res.data.sort(
            (a, b) => new Date(b.punchInTime) - new Date(a.punchInTime)
          )
        );
      } catch (err) {
        console.log(err);
      }
    };
    fetchAttendanceByDate();
  }, [params.employeeId, date]);

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
          My Attendance Records
        </Typography>
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{ marginTop: theme.spacing(4), marginBottom: theme.spacing(2) }}
          >
            <Controls.DatePicker
              name="date"
              label="Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Grid>
        </Grid>
      </Paper>

      <TableContainer component={Paper} className={classes.table}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Punch In</TableCell>
              <TableCell>Punch In Note</TableCell>
              <TableCell>Punch Out</TableCell>
              <TableCell>Punch Out Note</TableCell>
              <TableCell>Duration(Hours)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendances?.map((item) => (
              <TableRow
                key={item._id}
                sx={{ "&:last-child,  &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {Moment(item.punchInTime).format("MM-DD-YYYY hh:mm A")}
                </TableCell>
                <TableCell>{item.punchInNote}</TableCell>
                <TableCell>
                  {item.punchOutTime
                    ? Moment(item.punchOutTime).format("MM-DD-YYYY hh:mm A")
                    : ""}
                </TableCell>
                <TableCell>{item.punchOutNote}</TableCell>
                <TableCell align="center">
                  {item.punchOutTime
                    ? Moment(item.punchOutTime).hour() -
                      Moment(item.punchInTime).hour()
                    : Math.floor(
                        Moment(new Date()).hour() -
                          Moment(item.punchInTime).hour()
                      )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default MyRecords;
