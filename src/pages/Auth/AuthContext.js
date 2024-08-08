import React, { createContext, useContext, useReducer, useEffect } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../service/firebase"; // Adjust the import path as necessary
import { addUser } from "../../components/admin/users/UsersFetchAPI"; // Adjust the import path as necessary
// Create a new context
const AuthContext = createContext();

// Initial state
const initialState = {
  isAuthenticated: false,
  username: null,
};

// Reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        username: action.username,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        username: null,
      };
    default:
      return state;
  }
};

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const createUser = async ({ userId, displayName, email }) => {
    const user = { userId: userId, email: email, displayName: displayName };

    try {
      const response = await addUser(user);
      console.log(response);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      dispatch({ type: "LOGIN", username });
    }
  }, []);

  const login = async (email, password, userName) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      createUser({
        userId: user.uid,
        displayName: userName,
        email: user.email,
      });

      localStorage.setItem("username", user.email);
      dispatch({ type: "LOGIN", username: user.email });
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
