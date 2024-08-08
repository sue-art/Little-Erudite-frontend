import React, { createContext, useReducer } from "react";

const SeriesList = [
  {
    id: 1,
    name: "Dog Man",
    author: "all",
    color: "bg-blue-500",
    image: "/books/dog_man.png",
    search: "Dog Man",
    description:
      "Recognised as the most popular children's book author of the 20th century, Theodore Geisel (aka Dr. Seuss) had a career in illustration that varied widely before he wrote his first juvenile book. Early Works Volume 1 is the first in a series collecting various political cartoons, advertisements and various images drawn by Geisel long before he had written any of his world-famous books.",
  },
  {
    id: 3,
    name: "The Bad Guys",
    author: "Animals",
    color: "pink",
    image: "/books/bad_guys.png",
    search: "The Bad Guys",
    description: "",
  },
  {
    id: 4,
    name: "Cat Kid",
    author: "Biography",
    color: "indigo",
    image: "/books/cat_kid.png",
    search: "Cat kid",
    description: "",
  },
  {
    id: 5,
    name: "The Treehouse Books",
    author: "Andy Griffiths & Terry Denton",
    color: "red",
    image: "/books/treehouse.png",
    search: "169 storey treehouse",
    description:
      "Andy Griffiths and Terry Denton's Treehouse series is a whirlwind of wild and wacky adventures that will have you laughing out loud and clinging to the edge of your seat! Imagine a treehouse that grows by 13 stories with each book, starting with a modest 13 stories and expanding into a mind-boggling 130 stories (and beyond!). This isn't just any treehouse—it's equipped with everything from shark tanks and secret labs to marshmallow machines and time machines. Andy and Terry, the dynamic duo, navigate crazy capers and ridiculous rescues, often with their animal friends in tow. Perfect for anyone who loves laughter, creativity, and just a touch of mayhem, the Treehouse series is an exhilarating ride through an ever-expanding universe where the only limit is your imagination.",
  },
  {
    id: 6,
    name: "Diary Of A Wimpy Kid",
    author: "Jeff Kinney",
    color: "blue",
    image: "/books/wimpy_kid.png",
    search: "Diary Of A Wimpy Kid",
    description:
      "The Diary of a Wimpy Kid series, penned by Jeff Kinney, is a hilarious dive into the life of Greg Heffley, a middle schooler navigating the treacherous waters of adolescence with a blend of optimism and cluelessness. Through hand-drawn illustrations and Greg's candid diary entries, we're treated to his misadventures and the often cringe-worthy moments that come with growing up. Whether it's dealing with bullies, vying for popularity, or surviving his eccentric family, Greg's exploits are laugh-out-loud funny and painfully relatable. It's a roller coaster of emotions, awkward situations, and the eternal quest for coolness in the face of puberty's chaos. Perfect for anyone who's ever been a kid, this series is a masterclass in the art of surviving childhood and the hilarity that ensues when things don't go as planned.",
  },
  {
    id: 6,
    name: "Dr Seuss",
    author: "General",
    color: "purple",
    image: "/books/cat_in_hat.png",
    search: "Dr seuss",
    description:
      "Recognised as the most popular children's book author of the 20th century, Theodore Geisel (aka Dr. Seuss) had a career in illustration that varied widely before he wrote his first juvenile book. Early Works Volume 1 is the first in a series collecting various political cartoons, advertisements and various images drawn by Geisel long before he had written any of his world-famous books.",
  },
  {
    id: 7,
    name: "Roald Dahl",
    author: "General",
    color: "pink",
    image: "/books/roald_dahl.png",
    search: "roald dahl collection",
    description: "",
  },
  {
    id: 8,
    name: "Pigeon",
    author: "General",
    color: "indigo",
    image: "/books/pigeon.png",
    search: "pigeon",
    description: "",
  },
  {
    id: 9,
    name: "Ahn Do",
    author: "General",
    color: "purple",
    image: "/books/anh_do.png",
    search: "WeirDo",
    description:
      "Anh Do is a Vietnamese-born Australian author, actor, comedian, and painter. He has appeared on Australian TV shows such as Thank God You're Here and Good News Week, and was runner-up on Dancing with the Stars in 2007. He studied a combined Business Law degree at the University of Technology, Sydney. Wikipedia",
  },
  {
    id: 10,
    name: "The Bad Guys",
    author: "General",
    color: "pink",
    image: "/books/bad_guys.png",
    search: "The Bad Guys",
    description: "",
  },
  {
    id: 11,
    name: "Dog Man",
    author: "General",
    color: "indigo",
    image: "/books/dog_man.png",
    search: "Dog Man",
    description: "",
  },
];

// Define the initial state
const initialState = {
  bookserises: SeriesList,
  loading: true,
};

// Define the reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "LIST_BOOKS":
      return {
        ...state,
        bookserises: action.payload,
      };
    case "ADD_BOOK":
      return {
        ...state,
        bookserises: [...state.bookserises, action.payload],
      };
    case "EDIT_BOOK":
      return {
        ...state,
        bookserises: state.books.map((book) =>
          book.id === action.payload.id ? action.payload : book
        ),
      };
    case "DELETE_BOOK":
      return {
        ...state,
        bookserises: state.books.filter((book) => book.id !== action.payload),
      };
    default:
      return state;
  }
};

// Create the context
export const AdminBookListContext = createContext();

// Create the context provider component
const AdminBookListContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AdminBookListContext.Provider value={{ state, dispatch }}>
      {children}
    </AdminBookListContext.Provider>
  );
};

export default AdminBookListContextProvider;
