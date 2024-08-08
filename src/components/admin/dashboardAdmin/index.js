import React, { Fragment } from "react";
import GoogleBookSearch from "./books/GoogleBookSearch";

const DashboardAdmin = () => {
  return (
    <Fragment>
      <h1>Dashboard Admin</h1>
      <GoogleBookSearch />{" "}
    </Fragment>
  );
};

export default DashboardAdmin;
