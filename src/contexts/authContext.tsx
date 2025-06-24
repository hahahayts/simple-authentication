import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type {
  AuthContextType,
  AuthProviderProps,
  FormDataLogin,
  User,
} from "../types";
import { loginAction, logoutFunction } from "../actions/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>(
    localStorage.getItem("site") || ""
  );
  const [error, setError] = useState<string | null>(null);
  // TODO: Token management

  const navigate = useNavigate();

  useEffect(() => {
    isAlreadyLoggedIn();
  }, []);

  async function isAlreadyLoggedIn() {
    return token && navigate("/home");
  }

  const login = async (data: FormDataLogin) => {
    const result = await loginAction(data);

    console.log("Data Result: ", result);

    if (result.user) {
      const newToken = result.accessToken;

      setUser(result.user);
      localStorage.setItem("site", newToken);
      setToken(newToken);
      navigate("/home");
    }
  };
  const logout = () => {
    logoutFunction();
    setUser(null);
    setToken("");
    setError(null);
  };

  const value: AuthContextType = {
    user,
    token,
    error,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export default AuthProvider;
