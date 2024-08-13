import React, { Fragment, useReducer, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { AuthProvider } from "../pages/Auth/AuthContext";
import ThemeContextProvider from "./ThemeContextProvider";
import { themeReducer } from "./ThemeContextProvider";
import Hero from "./Hero";

const Layout = () => {
  const [state, dispatch] = useReducer(themeReducer, { theme: "light" });
  const location = useLocation();

  const toggleTheme = () => {
    dispatch({ type: "TOGGLE_THEME" });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Fragment>
      <ThemeContextProvider>
        <AuthProvider>
          <main
            className={state.theme}
            style={{
              minHeight: "800px",
            }}
          >
            <Navbar />
            {location.pathname === "/" && <Hero />}
            <div className="px-5 mx-auto max-w-2xl py-10 lg:max-w-7xl">
              <Outlet />
            </div>
          </main>
          <Footer toggleTheme={toggleTheme} state={state} />
        </AuthProvider>
      </ThemeContextProvider>
    </Fragment>
  );
};

export default Layout;
