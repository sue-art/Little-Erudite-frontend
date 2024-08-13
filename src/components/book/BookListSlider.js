import React, { useState, useEffect, useContext } from "react";
import { BookListContext } from "./BookListContext";
import { booksSearch } from "../../service/GoogleBooksAPI";

import Slider from "../NetflixSlider";
import BlogCategory from "../Blog/BlogCategory";
import BookListSliderWrap from "./BookListSliderWrap";
import book_list from "../initialBooks_v1";
import Book_List from "./BookData/bookdata";
import Loader from "../Loader";

const BookListSlider = ({ parameter, filter, order, bookcategory }) => {
  const { dispatch } = useContext(BookListContext);
  const [sliderlist, setSliderList] = useState();
  const [bookList, setBookList] = useState([]);

  const [loading, setLoading] = useState(true);
  //const [movies, setMovies] = useState([]);

  const fetchAndFilterData = async () => {
    try {
      /*
        // Replace 'https://example.com/api/books' with the actual URL to fetch books from
        const response = await fetch('https://example.com/api/books');
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const books = await response.json(); // Assuming the API returns a JSON array of books
      */
      // Filter books based on category name in the title
      /*
      const filteredBooks = Book_List.filter((book) =>
        book.volumeInfo.title.toLowerCase().includes(bookcategory.toLowerCase())
      );
      */

      const filteredBooks =
        Book_List &&
        Book_List.filter((item) => {
          if (
            item.volumeInfo &&
            item.volumeInfo.title
              .toUpperCase()
              .includes(bookcategory.toUpperCase())
          ) {
            return item;
          }
          return null; // Return null if any necessary properties are missing
        });

      // Here, you can set the filtered list to your state, for example, if you're using React
      setBookList(filteredBooks); // Uncomment and replace with your state update method

      console.log("filteredBooks", filteredBooks); // This line is just for demonstration. You might want to remove it.

      const movieslist = filteredBooks.map((item, index) => ({
        id: index + 1,
        // Check if 'imageLinks' exists and has a 'thumbnail', otherwise provide a default image path
        image:
          item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail
            ? item.volumeInfo.imageLinks.thumbnail
            : "/images/default-thumbnail.jpg",
        // Check if 'imageLinks' exists and has a 'smallThumbnail', otherwise provide a default background image path
        imageBg:
          item.volumeInfo.imageLinks &&
          item.volumeInfo.imageLinks.smallThumbnail
            ? item.volumeInfo.imageLinks.smallThumbnail
            : "/images/default-bg.jpg",
        title: item.volumeInfo.title,
        id: item.id,
      }));
      console.log("movielist", movieslist);
      setSliderList(movieslist);
    } catch (error) {
      console.error("Failed to fetch or filter books:", error);
    }
  };

  const fetchData = () => {
    //toSliderData(parameter, filter, order, bookcategory);
  };
  const toSliderData = (bookList) => {
    const movieslist = bookList.items.map((item, index) => ({
      id: index + 1,
      // Check if 'imageLinks' exists and has a 'thumbnail', otherwise provide a default image path
      image:
        item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail
          ? item.volumeInfo.imageLinks.thumbnail
          : "/images/default-thumbnail.jpg",
      // Check if 'imageLinks' exists and has a 'smallThumbnail', otherwise provide a default background image path
      imageBg:
        item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail
          ? item.volumeInfo.imageLinks.smallThumbnail
          : "/images/default-bg.jpg",
      title: item.volumeInfo.title,
    }));
    console.log("movielist", movieslist);
    setSliderList(movieslist);
  };

  useEffect(() => {
    //toSliderData(parameter, filter, order, bookcategory);
    setLoading(true);

    fetchAndFilterData();

    /*
    const movieslist = bookList.items.map((item, index) => ({
      id: index + 1,
      // Check if 'imageLinks' exists and has a 'thumbnail', otherwise provide a default image path
      image:
        item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail
          ? item.volumeInfo.imageLinks.thumbnail
          : "/images/default-thumbnail.jpg",
      // Check if 'imageLinks' exists and has a 'smallThumbnail', otherwise provide a default background image path
      imageBg:
        item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail
          ? item.volumeInfo.imageLinks.smallThumbnail
          : "/images/default-bg.jpg",
      title: item.volumeInfo.title,
    }));
    */
    //console.log("movielist", movieslist);
    //setSliderList(movieslist);
    setLoading(false);
  }, [loading]);

  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      {sliderlist ? (
        <BookListSliderWrap sliderlist={sliderlist} />
      ) : (
        <div>No books found</div>
      )}
    </div>
  );
};

export default BookListSlider;

const movies = [
  {
    id: 1,
    image:
      "http://books.google.com/books/content?id=Bqkg5_DeblcC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    imageBg:
      "http://books.google.com/books/content?id=Bqkg5_DeblcC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    title: "Magic Tree House 4: Pirates' Treasure!",
  },
  {
    id: 2,
    image:
      "http://books.google.com/books/content?id=iWouaDYkTtsC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    imageBg:
      "http://books.google.com/books/content?id=iWouaDYkTtsC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    title: "Magic Tree House 3: Secret of the Pyramid",
  },
  {
    id: 3,
    image:
      "http://books.google.com/books/content?id=xgzlXYjdWGMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    imageBg:
      "http://books.google.com/books/content?id=xgzlXYjdWGMC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    title: "Magic Tree House 5: Night of the Ninjas",
  },
  {
    id: 4,
    image:
      "http://books.google.com/books/content?id=6-p9EAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    imageBg:
      "http://books.google.com/books/content?id=6-p9EAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    title: "Memories and Life Lessons from the Magic Tree House",
  },
  {
    id: 5,
    image:
      "http://books.google.com/books/content?id=fHiYVeVEa64C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    imageBg:
      "http://books.google.com/books/content?id=fHiYVeVEa64C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    title: "Magic Tree House 6: Adventure on the Amazon",
  },
  {
    id: 6,
    image:
      "http://books.google.com/books/content?id=cU-EUc4nA6IC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    imageBg:
      "http://books.google.com/books/content?id=cU-EUc4nA6IC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    title: "Magic Tree House 8: Moon Mission!",
  },
  {
    id: 7,
    image:
      "http://books.google.com/books/content?id=QH4pAgAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    imageBg:
      "http://books.google.com/books/content?id=QH4pAgAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
    title: "Magic Tree House Books 5-8 Ebook Collection",
  },
  {
    id: 8,
    image:
      "http://books.google.com/books/content?id=CAUazj4WslQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    imageBg:
      "http://books.google.com/books/content?id=CAUazj4WslQC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    title: "Magic Tree House 13: Racing With Gladiators",
  },
  {
    id: 9,
    image:
      "http://books.google.com/books/content?id=SNs7DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    imageBg:
      "http://books.google.com/books/content?id=SNs7DwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    title: "Magic Tree House Merlin Missions Books 1-4",
  },
  {
    id: 10,
    image:
      "http://books.google.com/books/content?id=Y4hoBAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    imageBg:
      "http://books.google.com/books/content?id=Y4hoBAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    title: "Magic Tree House Fact & Fiction: Ghosts",
  },
  {
    id: 11,
    image:
      "http://books.google.com/books/content?id=tuAk6V582MUC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    imageBg:
      "http://books.google.com/books/content?id=tuAk6V582MUC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    title: "Knights and Castles",
  },
  {
    id: 12,
    image:
      "http://books.google.com/books/content?id=xzqOEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    imageBg:
      "http://books.google.com/books/content?id=xzqOEAAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
    title:
      "Magic Tree House Box of Puzzles, Games, and Activities (3 Book Set)",
  },
  {
    id: 13,
    image:
      "http://books.google.com/books/content?id=jND5cNqf8R8C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    imageBg:
      "http://books.google.com/books/content?id=jND5cNqf8R8C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    title: "Magic Tricks from the Tree House",
  },
  {
    id: 14,
    image:
      "http://books.google.com/books/content?id=UyKN7FiS6LsC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    imageBg:
      "http://books.google.com/books/content?id=UyKN7FiS6LsC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    title: "Magic Tree House 7: Mammoth to the Rescue",
  },
  {
    id: 15,
    image:
      "http://books.google.com/books/content?id=HIloBAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    imageBg:
      "http://books.google.com/books/content?id=HIloBAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    title: "Magic Tree House Fact & Fiction: Ninjas",
  },
  {
    id: 16,
    image:
      "http://books.google.com/books/content?id=1TqOEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    imageBg:
      "http://books.google.com/books/content?id=1TqOEAAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
    title: "Magic Tree House Amazing Activity Book",
  },
  {
    id: 17,
    image:
      "http://books.google.com/books/content?id=jK9QCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    imageBg:
      "http://books.google.com/books/content?id=jK9QCwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    title: "Magic Tree House Incredible Fact Book",
  },
  {
    id: 18,
    image:
      "http://books.google.com/books/content?id=L4hzAwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    imageBg:
      "http://books.google.com/books/content?id=L4hzAwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    title: "Magic Tree House Survival Guide",
  },
  {
    id: 19,
    image:
      "http://books.google.com/books/content?id=08Qn4vlZzj0C&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    imageBg:
      "http://books.google.com/books/content?id=08Qn4vlZzj0C&printsec=frontcover&img=1&zoom=5&source=gbs_api",
    title: "Magic Tree House Books 1-4 Ebook Collection",
  },
  {
    id: 20,
    image:
      "http://books.google.com/books/content?id=iZJ8QxKdHSAC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    imageBg:
      "http://books.google.com/books/content?id=iZJ8QxKdHSAC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    title: "Magic Tree House 10: A Wild West Ride",
  },
  {
    id: 21,
    image:
      "http://books.google.com/books/content?id=_YpoBAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    imageBg:
      "http://books.google.com/books/content?id=_YpoBAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    title: "Magic Tree House Fact & Fiction: Titanic",
  },
  {
    id: 22,
    image:
      "http://books.google.com/books/content?id=CwFdNdhOBsQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    imageBg:
      "http://books.google.com/books/content?id=CwFdNdhOBsQC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    title: "Space",
  },
  {
    id: 23,
    image:
      "http://books.google.com/books/content?id=hvo5AwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    imageBg:
      "http://books.google.com/books/content?id=hvo5AwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    title: "Ninjas and Samurai",
  },
  {
    id: 24,
    image:
      "http://books.google.com/books/content?id=SKDDxuELA1QC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    imageBg:
      "http://books.google.com/books/content?id=SKDDxuELA1QC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    title: "Moonlight on the Magic Flute",
  },
  {
    id: 25,
    image:
      "http://books.google.com/books/content?id=8TiNEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    imageBg:
      "http://books.google.com/books/content?id=8TiNEAAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
    title: "My Magic Tree House Journal",
  },
  {
    id: 26,
    image:
      "http://books.google.com/books/content?id=H4poBAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    imageBg:
      "http://books.google.com/books/content?id=H4poBAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    title: "Magic Tree House Fact & Fiction: Charles Dickens",
  },
  {
    id: 27,
    image:
      "http://books.google.com/books/content?id=fi2Q3h7p-DkC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    imageBg:
      "http://books.google.com/books/content?id=fi2Q3h7p-DkC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    title: "Pilgrims",
  },
  {
    id: 28,
    image:
      "http://books.google.com/books/content?id=zuaMEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    imageBg:
      "http://books.google.com/books/content?id=zuaMEAAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
    title: "Magic Tree House Collection: Books 17-24",
  },
  {
    id: 29,
    image:
      "http://books.google.com/books/content?id=9b_faVQl15UC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    imageBg:
      "http://books.google.com/books/content?id=9b_faVQl15UC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    title: "Haunted Castle on Hallows Eve",
  },
  {
    id: 30,
    image:
      "http://books.google.com/books/content?id=QEtq7APJsX8C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    imageBg:
      "http://books.google.com/books/content?id=QEtq7APJsX8C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    title: "Polar Bears and the Arctic",
  },
  {
    id: 31,
    image:
      "http://books.google.com/books/content?id=KfG3DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    imageBg:
      "http://books.google.com/books/content?id=KfG3DwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    title: "Llamas and the Andes",
  },
  {
    id: 32,
    image:
      "http://books.google.com/books/content?id=sIloBAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    imageBg:
      "http://books.google.com/books/content?id=sIloBAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    title: "Magic Tree House Fact & Fiction: Knights",
  },
  {
    id: 33,
    image:
      "http://books.google.com/books/content?id=D5p18jX79tMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    imageBg:
      "http://books.google.com/books/content?id=D5p18jX79tMC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    title: "Leprechauns and Irish Folklore",
  },
  {
    id: 34,
    image:
      "http://books.google.com/books/content?id=Oj7ZCgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    imageBg:
      "http://books.google.com/books/content?id=Oj7ZCgAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    title: "Dragons and Mythical Creatures",
  },
  {
    id: 35,
    image:
      "http://books.google.com/books/content?id=Rpv0BQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    imageBg:
      "http://books.google.com/books/content?id=Rpv0BQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    title: "Vikings",
  },
  {
    id: 36,
    image:
      "http://books.google.com/books/content?id=72OvPsUsuVUC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    imageBg:
      "http://books.google.com/books/content?id=72OvPsUsuVUC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    title: "Abraham Lincoln",
  },
];
