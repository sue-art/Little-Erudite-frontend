import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import { AuthProvider } from "../../../../pages/Auth/AuthContext";

const AdminLayoutContent = () => {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);

    if (user && user.email !== "admin@erudite.com.au") {
      // return navigate("/sign-in");
    }
  }, [user]);

  return (
    <>
      <AdminNavbar />
      <div className="h-screen flex flex-row flex-wrap bg-pink">
        <AdminSidebar />
        <div className="bg-pink flex-1 p-6 ">
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-7xl">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

const AdminLayout = () => {
  return (
    <AuthProvider>
      <AdminLayoutContent />
    </AuthProvider>
  );
};

export default AdminLayout;
