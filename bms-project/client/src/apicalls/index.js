import axios from "axios";

const token = localStorage.getItem("token");

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8082",
  headers: {
    withCredentials: true,
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }
});

axiosInstance.interceptors.request.use(function (request) {
  const token = localStorage.getItem("token");
  if (token) {
    request.headers["Authorization"] = `Bearer ${token}`;
  }
  return request;
}, function (err) {
  return Promise.reject(err);
});