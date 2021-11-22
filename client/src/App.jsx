import "./App.css";
import TopBar from "./components/TopBar";
import { Grid } from "@mui/material";
import SideBar from "./components/SideBar";
import axios from "axios";
import PersonalDetails from "./pages/PersonalDetails";
import { Routes, Route, useNavigate } from "react-router-dom";
import LeaveApply from "./pages/LeaveApply";
import LeaveList from "./pages/LeaveList";
import PunchInOut from "./pages/PunchInOut/index";
import MyRecords from "./pages/MyRecords";
import SignIn from "./pages/SignIn/index";
import { useEffect, useState } from "react";
import { EndPoints } from "./api";
import { useSelector } from "react-redux";

function App() {
  const [userId, setUserId] = useState(localStorage.getItem("employeeId"));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const details = useSelector((state) => state.employee.details);
  const navigate = useNavigate();

  const isLoggedIn = token !== null;

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    const getToken = async () => {
      if (token !== null) {
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };

        const req = {};
        try {
          await axios.post(
            EndPoints.BASE_URL + EndPoints.AUTH_CHECK,
            JSON.stringify(req),
            config
          );
        } catch (err) {
          console.log(err);
          localStorage.clear();
          navigate("/signin");
        }
      }
    };
    getToken();
  }, [token, isLoggedIn, userId, details, navigate]);

  return (
    <Grid container>
      {isLoggedIn && <SideBar />}
      <Grid item xs={10} sx={{ marginLeft: "auto", marginRight: "auto" }}>
        {isLoggedIn && <TopBar {...{ setUserId }} />}
        <Routes>
          <>
            <Route path="/" element={<SignIn />} />
            <Route path="/signin" element={<SignIn />} />

            {isLoggedIn && (
              <Route path="/employee/details" element={<PersonalDetails />} />
            )}
            {isLoggedIn && (
              <Route path="/employee/leave/apply" element={<LeaveApply />} />
            )}
            {isLoggedIn && (
              <Route path="/employee/leave/view/:id" element={<LeaveList />} />
            )}
            {isLoggedIn && (
              <Route
                path="/employee/time/punch_in_out/:employeeId"
                element={<PunchInOut />}
              />
            )}
            {isLoggedIn && (
              <Route
                path="/employee/time/myrecord/:employeeId"
                element={<MyRecords />}
              />
            )}
          </>
        </Routes>
      </Grid>
    </Grid>
  );
}

export default App;
