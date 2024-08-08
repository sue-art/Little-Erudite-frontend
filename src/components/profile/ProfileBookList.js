import React, { Fragment } from "react";

const ProfileBookList = ({ BookList, handleStatusChange }) => {
  return (
    <Fragment>
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Title</th>
            <th className="border p-2">Want to Read</th>
            <th className="border p-2">Currently Reading</th>
            <th className="border p-2">Read</th>
            <th className="border p-2">Change Status</th>
          </tr>
        </thead>
        <tbody>
          {BookList &&
            BookList.map((book, index) => (
              <tr key={book.id}>
                <td className="border p-2">
                  <div className="flex items-center mb-4">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-10 h-10 rounded-full"
                    />
                  </div>
                  <p className="text-sm font-bold  ">{book.title}</p>
                </td>
                <td className="border p-2 text-center">
                  {book.status === "Want to read" && "✓"}
                </td>
                <td className="border p-2 text-center">
                  {book.status === "Currently reading" && "✓"}
                </td>
                <td className="border p-2 text-center">
                  {book.status === "Read" && "✓"}
                </td>
                <td className="border p-2 text-center">
                  <select
                    value={book.status}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                    className="border text-gray rounded p-1 ml-2"
                  >
                    <option value="Want to read">Want to read</option>
                    <option value="Currently reading">Currently reading</option>
                    <option value="Read">Read</option>
                    <option value="Remove">Remove</option>
                  </select>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ProfileBookList;
