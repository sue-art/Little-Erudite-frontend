// Import the necessary dependencies
import axios from "axios";
const API_URL = "http://localhost:8000";

// Function to fetch the book series list

// Function to get book series list
export const getBookSeriesList = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/series/`);
    return response.data;
  } catch (error) {
    console.error("Error getting book series list:", error);
    throw error;
  }
};

export const getBookList = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/books/`);
    return response.data;
  } catch (error) {
    console.error("Error getting book series list:", error);
    throw error;
  }
};

// Function to add a book series list
export const addBookSeriesList = async (listData) => {
  console.log(listData);
  try {
    const response = await axios.post(
      `${API_URL}/api/series/add-bookseries`,
      listData
    );
    return response.data;
  } catch (error) {
    console.error("Error adding book series list:", error);
    throw error;
  }
};

// Function to edit a book series list
export const editBookSeriesList = async (listId, updatedListData) => {
  try {
    const response = await axios.put(
      `${API_URL}/api/series/${listId}`,
      updatedListData
    );
    return response.data;
  } catch (error) {
    console.error("Error editing book series list:", error);
    throw error;
  }
};

// Function to delete a book series list
export const deleteBookSeriesList = async (listId) => {
  try {
    const response = await axios.delete(`${API_URL}/bookseries/${listId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting book series list:", error);
    throw error;
  }
};

//Function to add a new book
export const addNewBook = async (bookData) => {
  try {
    console.log("bookData", bookData);
    const response = await axios.post(`${API_URL}/api/books/`, bookData);
    return response.data;
  } catch (error) {
    console.error("Error adding new book:", error);
    throw error;
  }
};

// Function to delete a book series list
export const deleteBook = async (listId) => {
  try {
    console.log("listId", listId);
    const response = await axios.delete(`${API_URL}/api/books/${listId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting book series list:", error);
    throw error;
  }
};
