import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:5000/api",
});

const setToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

const register = async (payload) => {
  try {
    const { data } = await API.post("/auth/register", payload);
    return data;
  } catch (err) {
    return { error: err?.response?.data || { message: err.message } };
  }
};

const registerHospital = async (payload) => {
  try {
    const { data } = await API.post("/auth/register-hospital", payload);
    return data;
  } catch (err) {
    return { error: err?.response?.data || { message: err.message } };
  }
};

const login = async (payload) => {
  try {
    const { data } = await API.post("/auth/login", payload);
    return data;
  } catch (err) {
    return { error: err?.response?.data || { message: err.message } };
  }
};

// This function was missing
const getProfile = async () => {
  try {
    const { data } = await API.get("/auth/profile");
    return data;
  } catch (err) {
    return { error: err?.response?.data || { message: err.message } };
  }
};

// Generic helpers for other API calls that require the auth header
const get = async (path) => {
  try {
    const { data } = await API.get(path);
    return { data };
  } catch (err) {
    return { error: err?.response?.data || { message: err.message } };
  }
};

const post = async (path, payload) => {
  try {
    const { data } = await API.post(path, payload);
    return { data };
  } catch (err) {
    return { error: err?.response?.data || { message: err.message } };
  }
};

const patch = async (path, payload) => {
  try {
    const { data } = await API.patch(path, payload);
    return { data };
  } catch (err) {
    return { error: err?.response?.data || { message: err.message } };
  }
};

export default {
  register,
  registerHospital,
  login,
  setToken,
  getProfile, // Export the new function
  get,
  post,
  patch,
};