import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createEndPoints, EndPoints } from "../api";

export const fetchDetails = createAsyncThunk(
  "employee/fetchdetails",
  async (id) => {
    const res = await createEndPoints(EndPoints.EMPLOYEE).fetchById(id);

    return res.data;
  }
);
export const updateDetails = createAsyncThunk(
  "employee/updatedetails",
  async (updatedRecord) => {
    const res = await createEndPoints(EndPoints.EMPLOYEE).update(updatedRecord);

    return res.data;
  }
);

export const createLeave = createAsyncThunk(
  "employee/createLeave",
  async (record) => {
    const res = await createEndPoints(EndPoints.LEAVE).create(record);

    return res.data;
  }
);

export const createAttendance = createAsyncThunk(
  "employee/createAttendance",
  async (record) => {
    const res = await createEndPoints(EndPoints.ATTENDANCE).create(record);

    return res.data;
  }
);

export const updateAttendance = createAsyncThunk(
  "employee/updateAttendance",
  async (record) => {
    const res = await createEndPoints(EndPoints.ATTENDANCE).update(record);

    return res.data;
  }
);

export const getLeaves = createAsyncThunk("employee/getLeaves", async (id) => {
  const res = await createEndPoints(EndPoints.LEAVE_ALL_EMPLOYEE_ID).fetchById(
    id
  );

  return res.data;
});

export const getAttendances = createAsyncThunk(
  "employee/getAttendances",
  async (id) => {
    const res = await createEndPoints(
      EndPoints.ATTENDANCE_ALL_EMPLOYEE_ID
    ).fetchById(id);

    return res.data;
  }
);

export const login = createAsyncThunk("employee/login", async (record) => {
  const res = await createEndPoints(EndPoints.AUTH_LOGIN).create(record);

  return res.data;
});

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    details: {
      _id: "",
      firstName: "",
      middleName: "",
      lastName: "",
      dateOfBirth: "",
      maritalStatus: "",
      gender: "",
      hireDate: "",
    },
    leaves: [],
    attendaces: [],
  },
  reducers: {},
  extraReducers: {
    [fetchDetails.fulfilled]: (state, action) => {
      state.details = action.payload;
    },
    [updateDetails.fulfilled]: (state, action) => {
      state.details = action.payload;
    },
    [createLeave.fulfilled]: (state, action) => {
      state.leaves.push(action.payload);
    },
    [createAttendance.fulfilled]: (state, action) => {
      state.attendaces.push(action.payload);
    },
    [updateAttendance.fulfilled]: (state, action) => {
      state.attendaces = state.attendaces.map((item) => {
        if (item._id !== action.payload._id) {
          return item;
        }
        return {
          ...item,
          ...action.payload,
        };
      });
    },
    [getLeaves.fulfilled]: (state, action) => {
      state.leaves = action.payload;
    },
    [getAttendances.fulfilled]: (state, action) => {
      state.attendaces = action.payload.sort(
        (a, b) => new Date(b.punchInTime) - new Date(a.punchInTime)
      );
    },
    [login.fulfilled]: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("employeeId", action.payload.info._id);
      state.details = action.payload.info;
    },
  },
});

const employeeReducer = employeeSlice.reducer;
export default employeeReducer;
