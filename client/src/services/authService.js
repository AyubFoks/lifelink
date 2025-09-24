import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:5000/api",
});

const setToken = (token) => {
  if (token) API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete API.defaults.headers.common["Authorization"];
};

const register = async (payload) => {
  try {
    const { data } = await API.post("/auth/register", payload);
    return data;
  } catch (err) {
    return { error: err?.response?.data || err.message };
  }
};

const login = async (payload) => {
  try {
    const { data } = await API.post("/auth/login", payload);
    return data;
  } catch (err) {
    return { error: err?.response?.data || err.message };
  }
};

export default { register, login, setToken };
