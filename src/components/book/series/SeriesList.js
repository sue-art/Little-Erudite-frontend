import React, { Fragment, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { BookListContext } from "../BookListContext";
import { getAllSeries } from "../../admin/series/SeriesFetchAPI";
import { convertTitleToSlug } from "../../Features/ConvertAPI";
import Loader from "../../Loader";

const SeriesList = ({ carousel }) => {
  const [series, setSeries] = useState([]);
  const [error, setError] = useState(null);
  const { data, dispatch } = useContext(BookListContext);
  const { loading } = data;

  const getColorClass = (index) => {
    switch (index) {
      case 0:
        return "bg-pink";
      case 1:
        return "bg-blue";
      case 2:
        return "bg-purple";
      case 3:
        return "bg-green";
      case 4:
        return "bg-yellow";
      case 5:
        return "bg-red";
      case 6:
        return "bg-pink";
      case 7:
        return "bg-gray";
      case 8:
        return "bg-blue";
      default:
        return "bg-green"; // Default case if color doesn't match
    }
  };

  useEffect(() => {
    // Fetch series data
    const fetchAllSeries = async () => {
      dispatch({ type: "loading", payload: true });
      const seriesAll = await getAllSeries();
      if (seriesAll.error) {
        setError(seriesAll.error);
      } else if (seriesAll) {
        setSeries(seriesAll);
      }

      dispatch({ type: "loading", payload: false });
    };

    fetchAllSeries();
  }, [dispatch]);

  // Handle error
  if (error) {
    return <div className="error">Error: error fetching</div>;
  }
  if (loading) {
    return <Loader />;
  }

  return (
    <Fragment>
      <h2 className="text-2xl mt-10 mb-5 font-bold tracking-tight text-gray-900">
        Popular book Series
      </h2>
      <div className="flex items-stretch justify-center mt-5 pb-10 flex-wrap">
        {carousel ? (
          <div className="carousel rounded-box">
            {series.map((item, index) => (
              <div
                className={`${getColorClass(
                  index
                )} carousel-item mr-5 w-[300px] h-[200px] overflow-hidden
               p-5 rounded-lg hover:bg-opacity-50 focus:ring-4 focus:outline-none  `}
                key={item._id}
              >
                <Link
                  to={`/books/?series=${convertTitleToSlug(item.name)}`}
                  className=" item-center w-[300px] h-[200px]"
                >
                  <div className="flex items-center justify-center h-[200px]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          series.map((item) => (
            <Link
              to={`/books?series=${convertTitleToSlug(item.name)}`}
              key={item._id}
            >
              <button
                type="button"
                value={item.name}
                className="text-white bg-green hover:bg-white hover:text-blue text-sm border border-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800"
              >
                <img src={item.image} alt={item.name} />
                {item.name}
              </button>
            </Link>
          ))
        )}

        {error && <p>{error}</p>}
      </div>
    </Fragment>
  );
};
export default SeriesList;
