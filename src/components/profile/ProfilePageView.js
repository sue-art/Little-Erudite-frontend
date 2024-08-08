import React, { Fragment, useState, useEffect } from "react";
import { useAuth } from "../../pages/Auth/AuthContext";
import Card from "../Cards/Card";
import Avatar from "../Avata/Avata";
import {
  getUserById,
  updateUserBookStatus,
} from "../admin/users/UsersFetchAPI";
import ProfileBookList from "./ProfileBookList";

const ProfilePageView = () => {
  const { username } = useAuth();
  const [BookList, setBookList] = useState([]);
  const [ViewedBooks, setViewedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserBookList = async (username) => {
    try {
      const getData = await getUserById(username);
      if (!getData) return;

      const generateUniqueId = (index) => `${username}-${index}`;

      if (!getData.booklist) {
        setBookList([]);
        setLoading(false);
        return;
      }

      const BookListwithId = getData.booklist.map((book, index) => ({
        ...book,
        id: generateUniqueId(index),
      }));
      setBookList(BookListwithId);

      const ViewedBookListwithId = getData.viewedbooklist.map(
        (book, index) => ({
          ...book,
          id: generateUniqueId(index),
        })
      );
      setViewedBooks(ViewedBookListwithId);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching user book list:", error);
      setLoading(false);
    }
  };

  const handleStatusChange = (index, newStatus) => {
    let updatedBookList;

    if (newStatus === "Remove") {
      updatedBookList = BookList.filter((book, i) => i !== index);
    } else {
      updatedBookList = BookList.map((book, i) =>
        i === index ? { ...book, status: newStatus } : book
      );
    }

    setBookList(updatedBookList);
    updateUserBookStatus(username, updatedBookList);
  };

  const handleReadingListAdd = (title, image, status) => {
    const updatedBookList = [
      ...BookList,
      {
        title: title,
        image: image,
        status: status,
      },
    ];
    setBookList(updatedBookList);
    updateUserBookStatus(username, updatedBookList);
  };

  useEffect(() => {
    fetchUserBookList(username);
  }, [username]);

  if (loading) return <div>Loading...</div>;

  return (
    <Fragment>
      <div className="mx-auto max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
        <div className="lg:col-span-1 lg:border-r lg:border-gray-200 lg:pr-8">
          <Card color={"green"}>
            <div className="flex items-center justify-center w-20 mt-3">
              <Avatar name={"Sam"} size={"medium"} />
            </div>
            <h5 className="text-1xl font-bold tracking-tight text-gray-900 dark:text-white">
              Welcome, {username}{" "}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Reading Level: Intermediate
            </p>
          </Card>
        </div>
        <div className="lg:col-span-2 200 lg:pr-8">
          <div className="mb-4">
            <Card color={"pink"}>
              <h5 className="my-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Your Reading List{" "}
              </h5>
              <div className="mb-4">
                {BookList && (
                  <ProfileBookList
                    BookList={BookList}
                    handleStatusChange={handleStatusChange}
                  />
                )}
              </div>
            </Card>
          </div>
          <Card color={"yellow"}>
            <h5 className="my-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Viewed Books{" "}
            </h5>
            {ViewedBooks &&
              ViewedBooks.map((book) => (
                <div
                  key={book.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="ml-2">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">
                        {book.title}
                      </p>
                    </div>
                  </div>
                  <button
                    className="text-sm font-bold text-gray-900 dark:text-white"
                    onClick={() =>
                      handleReadingListAdd(
                        book.title,
                        book.image,
                        "Want to read"
                      )
                    }
                  >
                    Add to Reading List
                  </button>
                </div>
              ))}
          </Card>
        </div>
      </div>
    </Fragment>
  );
};

export default ProfilePageView;
