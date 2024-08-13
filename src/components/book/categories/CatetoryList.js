import React, { Fragment, useState, useEffect, useContext } from "react";
import { BookListContext } from "../BookListContext";
import { getAllSeries } from "../../admin/series/SeriesFetchAPI";
import { Link, useLocation } from "react-router-dom";

const CatetoryList = () => {
  const [series, setSeries] = useState([]);
  const { data, dispatch } = useContext(BookListContext);
  const location = useLocation();

  const fetchData = async () => {
    try {
      const data = await getAllSeries();
      setSeries(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch({ type: "categoryFilterd", payload: e.target.value });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Fragment>
      <div
        className={`flex justify-${
          location.pathname === "/" ? "start" : "center"
        } pt-20 flex-wrap`}
      >
        {series.map((item, index) => (
          <Link to={`/series/${item.value}`} key={item._id}>
            <button
              type="button"
              value={item.name}
              className="text-white bg-green text-sm hover:bg-white hover:text-blue border border-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800"
            >
              {item.name}
            </button>
          </Link>
        ))}
      </div>
    </Fragment>
  );
};

export default CatetoryList;
