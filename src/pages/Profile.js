import React, { useEffect } from "react";
import GenresList from "../components/Book/genres/GenresList";
import SearchBar from "../components/Book/Search/SearchBar";
import BooksListContextProvider from "../components/Book/BookListContext";
import ProfilePageView from "../components/profile/ProfilePageView";
import SignIn from "./Auth/SingIn";
import { useAuth } from "./Auth/AuthContext";

const Profile = () => {
  const { username } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <BooksListContextProvider>
      <div className="mt-10">
        <GenresList />
        <SearchBar />
        {!username ? <SignIn /> : <ProfilePageView />}
      </div>
    </BooksListContextProvider>
  );
};

export default Profile;
