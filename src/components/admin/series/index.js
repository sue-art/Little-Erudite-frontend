import React, { Fragment, useEffect, useState } from "react";
import { getAllSeries, createSeries, deleteSeries } from "./SeriesFetchAPI";

const SerieDashboard = () => {
  const [series, setSeries] = useState([]);
  const [editSeries, setEditSeries] = useState(null);
  const [newSeries, setNewSeries] = useState([
    "_id",
    "name",
    "author",
    "image",
  ]);
  const [addBook, setAddBook] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchData = async () => {
    const data = await getAllSeries();
    setSeries(data);
    setLoading(false);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
  };

  const handleEditSeries = (item) => {
    setEditSeries(item);
  };

  const handleDeleteSeries = (item) => {
    try {
      deleteSeries(item._id);
      setMessage("Series deleted successfully");
      setSeries(series.filter((series) => series._id !== item._id));
    } catch (error) {
      console.log(error);
      setMessage("Error deleting series");
    }

    console.log(item);
  };

  const handleAddNewSeriesOnSubmit = (e) => {
    e.preventDefault();
    createSeries(newSeries);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Fragment>
      <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
        <div className="lg:col-span-1 lg:row-span-1">
          <h2 className="text-lg font-medium text-gray-900">Book Series</h2>

          <table className="w-full">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Author</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {series &&
                series.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10"
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.author}</td>
                    <td>
                      <button onClick={() => handleEditSeries(item)}>
                        Edit
                      </button>
                    </td>
                    <td>
                      <button onClick={() => handleDeleteSeries(item)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {message && <p>{message}</p>}
        </div>
        <div className="lg:col-span-1 lg:row-span-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setEditSeries(null)}
          >
            Add New Series
          </button>
          {editSeries ? (
            <form onSubmit={handleOnSubmit}>
              <div className="flex flex-col">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  value={editSeries.name}
                  onChange={(e) =>
                    setEditSeries({ ...editSeries, name: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="author">Image:</label>
                <input
                  type="text"
                  value={editSeries.image}
                  onChange={(e) =>
                    setEditSeries({
                      ...editSeries,
                      image: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="author">Author:</label>
                <input
                  type="text"
                  value={editSeries.author}
                  onChange={(e) =>
                    setEditSeries({
                      ...editSeries,
                      author: e.target.value,
                    })
                  }
                />
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setAddBook(true)}
              >
                Add Book Series
              </button>
              {addBook && <p>Book added</p>}
            </form>
          ) : (
            <p>Add New Series</p>
          )}
          {newSeries && (
            <form onSubmit={handleAddNewSeriesOnSubmit}>
              <div className="flex flex-col">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  value={newSeries.name}
                  onChange={(e) =>
                    setNewSeries({ ...newSeries, name: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="author">Image:</label>
                <input
                  type="text"
                  value={newSeries.image}
                  onChange={(e) =>
                    setNewSeries({
                      ...newSeries,
                      image: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="author">Author:</label>
                <input
                  type="text"
                  value={newSeries.author}
                  onChange={(e) =>
                    setNewSeries({
                      ...newSeries,
                      author: e.target.value,
                    })
                  }
                />
              </div>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Add Book Series
              </button>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default SerieDashboard;
