import React, { createContext, useReducer } from "react";

export const ThemeContext = createContext();

export const themeReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_THEME":
      return state === "light" ? "dark" : "light";
    default:
      return state;
  }
};

const ThemeContextProvider = ({ children }) => {
  const [theme, dispatch] = useReducer(themeReducer, "light");

  const toggleTheme = () => {
    dispatch({ type: "TOGGLE_THEME" });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
