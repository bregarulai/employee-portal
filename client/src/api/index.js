import axios from "axios";

const BASE_URL = "http://localhost:8801/api/";

export const EndPoints = {
  BASE_URL: "http://localhost:8801/api/",
  EMPLOYEE: "employee",
  LEAVE_TYPE: "leavetype",
  LEAVE: "leave",
  LEAVE_ALL_EMPLOYEE_ID: "leave/all",
  ATTENDANCE_ALL_EMPLOYEE_ID: "attendance/all",
  ATTENDANCE: "attendance",
  AUTH_LOGIN: "auth/login",
  AUTH_CHECK: "auth/check",
};

export const createEndPoints = (endpoint) => {
  let url = BASE_URL + endpoint + "/";
  return {
    fetchAll: () => axios.get(url),
    fetchById: (id) => axios.get(url + id),
    create: (newRecord) => axios.post(url, newRecord),
    update: (updatedRecord) => axios.put(url, updatedRecord),
    delete: (id) => axios.delete(url + id),
  };
};
