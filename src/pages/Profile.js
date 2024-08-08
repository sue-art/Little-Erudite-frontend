import React from "react";
import GenresList from "../components/Book/genres/GenresList";
import SearchBar from "../components/Book/Search/SearchBar";
import BooksListContextProvider from "../components/Book/BookListContext";
import ProfilePageView from "../components/profile/ProfilePageView";

const Profile = () => {
  return (
    <BooksListContextProvider>
      <div className="mt-10">
        <GenresList />
        <SearchBar />
        <ProfilePageView />
      </div>
    </BooksListContextProvider>
  );
};

export default Profile;
