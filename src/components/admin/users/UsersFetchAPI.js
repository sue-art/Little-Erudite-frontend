const serverurl = process.env.REACT_APP_SERVER_API_URL;
const API_URL = `${serverurl}/api/users`;

export const getAllUsers = async () => {
  return fetch(API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.error("Error fetching data:", error));
};

export const getUserById = async (id) => {
  if (!id) {
    return null;
  }
  return fetch(`${API_URL}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.error("Error fetching data:", error));
};

export const addUser = async (user) => {
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.error("Error fetching data:", error));
};

export const updateUser = async (id, user) => {
  return fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.error("Error fetching data:", error));
};

export const deleteUser = async (id) => {
  return fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.error("Error fetching data:", error));
};

export const addReadingListtoUser = async (email, newBook) => {
  try {
    // Fetch the current read book list for the user
    const currentListResponse = await fetch(`${API_URL}/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!currentListResponse.ok) {
      throw new Error("Failed to fetch current read book list");
    }

    const { booklist: currentBookList } = await currentListResponse.json();
    let updatedBookList;

    if (!currentBookList) {
      updatedBookList = [newBook];
    } else {
      // Check if the new book is already in the current list
      const isBookInList = currentBookList.some(
        (book) => book.title === newBook.title
      );

      // If the book is not in the list, add it to the list
      if (!isBookInList) {
        updatedBookList = [...currentBookList, newBook];
      } else {
        updatedBookList = [...currentBookList];
      }
    }
    // Update the user's read book list
    const response = await fetch(`${API_URL}/updateBookStatus/${email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        booklist: updatedBookList,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update book status");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating book status:", error);
  }
};

export const updateUserBookStatus = async (email, updatedBookList) => {
  try {
    const response = await fetch(`${API_URL}/updateBookStatus/${email}`, {
      method: "PUT", // or 'PUT' depending on your API design
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        booklist: updatedBookList,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update book status");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error updating book status:", error);
  }
};

// Add a book to the user's viewed book list
export const addViewedBooktoUser = async (email, newBook) => {
  try {
    // Fetch the current viewed book list for the user
    const currentListResponse = await fetch(`${API_URL}/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!currentListResponse.ok) {
      throw new Error("Failed to fetch current viewed book list");
    }

    const { viewedbooklist: currentBookList } =
      await currentListResponse.json();

    let updatedBookList;

    if (!currentBookList) {
      updatedBookList = [newBook];
    } else {
      // Check if the new book is already in the current list
      const isBookInList = currentBookList.some(
        (book) => book.title === newBook.title
      );
      // If the book is not in the list, add it to the list
      if (!isBookInList) {
        updatedBookList = [...currentBookList, newBook];
      } else {
        updatedBookList = [...currentBookList];
      }
    }

    // Update the user's viewed book list
    const response = await fetch(`${API_URL}/addViewedBook/${email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        viewedbooklist: updatedBookList,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update book status");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding book list:", error);
  }
};
