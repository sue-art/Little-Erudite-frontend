import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import { AuthProvider } from "../../../../pages/Auth/AuthContext";

const AdminLayout = ({ children }) => {
  return (
    <Fragment>
      <AuthProvider>
        <AdminNavbar />
        <div class="h-screen flex flex-row flex-wrap bg-pink">
          <AdminSidebar />
          <div class="bg-pink flex-1 p-6 ">
            <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-7xl">
              <Outlet />
            </div>
          </div>
        </div>
      </AuthProvider>
    </Fragment>
  );
};

export default AdminLayout;
