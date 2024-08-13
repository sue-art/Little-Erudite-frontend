import React from "react";
import GenresList from "../components/book/genres/GenresList";
import SearchBar from "../components/book/Search/SearchBar";
import BooksListContextProvider from "../components/book/BookListContext";
import ProfilePageView from "../components/profile/ProfilePageView";
import SignIn from "./Auth/SingIn";
import { useAuth } from "./Auth/AuthContext";

const Profile = () => {
  const { isAuthenticated } = useAuth();

  return (
    <BooksListContextProvider>
      <div className="mt-10">
        {!isAuthenticated ? (
          <SignIn />
        ) : (
          <>
            <GenresList />
            <SearchBar />
            <ProfilePageView />
          </>
        )}
      </div>
    </BooksListContextProvider>
  );
};

export default Profile;
