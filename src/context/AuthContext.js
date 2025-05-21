import React, { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("token"));

  const login = (token) => {
    localStorage.setItem("token", token);
    setAuthToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setAuthToken(storedToken);
  }, []);

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Add this custom hook to fix the error
export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
