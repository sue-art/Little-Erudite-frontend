import React, { createContext, useContext, useReducer } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../service/firebase"; // Adjust the import path as necessary

import {
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";

// Create a new context
const AuthContext = createContext();

// Initial state
const initialState = {
  isAuthenticated: false,
  user: { email: null, displayName: null },
  username: null,
  loading: null,
  error: null,
};

// Reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: {
          email: action.payload.userEmail,
          displayName: action.payload.displayName,
        },
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: {
          email: null,
          displayName: null,
        },
      };
    case "LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const createAccount = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setLogin(user);
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        //const credential = GoogleAuthProvider.credentialFromResult(result);
        //const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setLogin(user);
      })
      .catch((error) => {
        dispatch({ type: "SET_ERROR", payload: error.message });
      });
  };

  const signInWithEmail = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setLogin(user);
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      throw new Error(error.message);
    }
  };

  const setLogin = (user) => {
    const userData = { userEmail: user.email, displayName: user.displayName };
    dispatch({ type: "LOGIN", payload: userData });
    localStorage.setItem("user", JSON.stringify(userData));
    dispatch({ type: "LOADING", payload: false });
  };

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.loading,
        createAccount,
        signInWithGoogle,
        signInWithEmail,
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
