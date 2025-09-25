import { createContext, useState, useContext, useEffect } from "react";
import authService from "../services/authService.js"; 
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        authService.setToken(token);
        try {
          const profileData = await authService.getProfile();
          if (profileData && !profileData.error) {
              // Normalize role strings if backend or older clients use alternate names
              if (profileData.role === 'hospital') profileData.role = 'hospital_admin';
              setUser(profileData);
              setIsAuthenticated(true);
            } else {
            localStorage.removeItem("token");
          }
        } catch (error) {
          console.error("Failed to fetch profile:", error);
          localStorage.removeItem("token");
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (payload) => {
    setLoading(true);
    try {
      const res = await authService.login(payload);
      if (res?.error) {
        throw new Error(res.error.message || "Login failed");
      }

      if (res.access_token) {
        localStorage.setItem("token", res.access_token);
        authService.setToken(res.access_token);
        const profileData = await authService.getProfile();

        if (profileData && !profileData.error) {
          setUser(profileData);
          setIsAuthenticated(true);
          return { user: profileData };
        } else {
          throw new Error("Failed to fetch profile after login.");
        }
      }
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("token");
      authService.setToken(null);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    authService.setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const refreshProfile = async () => {
    try {
      const profileData = await authService.getProfile();
      if (profileData && !profileData.error) {
        if (profileData.role === 'hospital') profileData.role = 'hospital_admin';
        setUser(profileData);
        setIsAuthenticated(true);
        return profileData;
      }
    } catch (err) {
      console.error('Failed to refresh profile', err);
    }
    return null;
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, login, logout, refreshProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};