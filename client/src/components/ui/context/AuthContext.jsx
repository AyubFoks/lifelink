import React, { createContext, useContext, useEffect, useState } from "react";
import authService from "../../../services/authService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("ll_user");
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  });
  
  const [token, setToken] = useState(() => localStorage.getItem("ll_token"));

  useEffect(() => {
    if (token) authService.setToken(token);
  }, [token]);

  const login = async (credentials) => {
    const res = await authService.login(credentials);
    if (res?.token) {
      setToken(res.token);
      setUser(res.user);
      localStorage.setItem("ll_token", res.token);
      localStorage.setItem("ll_user", JSON.stringify(res.user));
    }
    return res;
  };

  const register = async (payload) => {
    const res = await authService.register(payload);
    return res;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("ll_token");
    localStorage.removeItem("ll_user");
    authService.setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
