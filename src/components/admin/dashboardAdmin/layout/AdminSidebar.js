import React, { Fragment } from "react";

const AdminSidebar = () => {
  return (
    <Fragment>
      <div
        id="sideBar"
        className="relative flex flex-col flex-wrap bg-white border-r border-gray-300 p-6 flex-none w-64 md:-ml-64 md:fixed md:top-0 md:z-30 md:h-screen md:shadow-xl animated faster"
      >
        <div class="flex flex-col">
          <ul>
            <li>Book</li>
            <li>Quiz</li>
            <li>Blog</li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default AdminSidebar;
