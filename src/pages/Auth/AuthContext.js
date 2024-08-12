import React, { createContext, useContext, useEffect, useReducer } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../service/firebase"; // Adjust the import path as necessary
// Create a new context
const AuthContext = createContext();

// Initial state
const initialState = {
  isAuthenticated: false,
  username: null,
  loading: null,
  user: null,
};

// Reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        username: action.payload.email,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        username: null,
        user: null,
      };
    case "SET_USER":
      return {
        ...state,
        username: action.payload,
      };
    case "LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      dispatch({ type: "LOGIN", payload: user });
      localStorage.setItem("user", user);
      dispatch({ type: "LOADING", payload: false });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("username");
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        username: state.username,
        state,
        dispatch,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to access the authentication state and functions
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
