import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import {
  loginUser,
  registerUser,
} from "../services/authService";

const AuthContext =
  createContext();

export const AuthProvider = ({
  children,
}) => {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const savedUser =
      localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    setLoading(false);
  }, []);

  const login = async (
    email,
    password
  ) => {
    try {
      const response =
        await loginUser({
          email,
          password,
        });

      localStorage.setItem(
        "token",
        response.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          response.user
        )
      );

      setUser(response.user);

      return response;
    } catch (error) {
      throw (
        error.response?.data ||
        error.message
      );
    }
  };

  const register = async (
    formData
  ) => {
    try {
      const response =
        await registerUser(
          formData
        );

      return response;
    } catch (error) {
      throw (
        error.response?.data ||
        error.message
      );
    }
  };

  const logout = () => {
    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);

export default AuthContext;