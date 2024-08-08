import React, { Fragment } from "react";
import AdminBookContextProvider from "./AdminBookContextProvider";
import BookList from "./BookList";
import BookEdit from "./BookEdit";

const BooksDashboard = () => {
  return (
    <Fragment>
      <AdminBookContextProvider>
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <BookList />
          <BookEdit />
        </div>
      </AdminBookContextProvider>
    </Fragment>
  );
};

export default BooksDashboard;
