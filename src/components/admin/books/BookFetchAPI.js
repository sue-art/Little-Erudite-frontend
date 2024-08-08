const serverurl = process.env.REACT_APP_SERVER_API_URL;
const API_URL = `${serverurl}/api/books`;

// Fetch all books
export const getAllBooks = async () => {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

// Fetch a book by ID
export const getBookById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};
// Fetch books by title
export const getBooksByTitle = async (title) => {
  const response = await fetch(`${API_URL}/byTitle/${title}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

// Fetch books by author
export const getBooksByAuthor = async (author) => {
  const response = await fetch(`${API_URL}/byAuthor/${author}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

//Fetch books by keywordlist
export const getBooksByGenre = async (genre) => {
  const response = await fetch(`${API_URL}/byGenre/${genre}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

//Fetch books by roadmap list
export const getBooksByRoadmap = async (roadmap) => {
  const response = await fetch(`${API_URL}/byRoadmap/${roadmap}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

//Fetch books by series
export const getBooksBySeries = async (name) => {
  const response = await fetch(`${API_URL}/bySeries/${name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

// Create a new book
export const createBook = async (book) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });
  const data = await response.json();
  return data;
};

// Update a book
export const updateBook = async (_id, book) => {
  const response = await fetch(`${API_URL}/${_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });

  const data = await response.json();
  return data;
};

// Delete a book
export const deleteBook = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};

// get book description from OpenAI
export const getBookDescription = async ({ title, author, description }) => {
  const response = await fetch("http://localhost:8000/api/chatbot/book", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, author, description }),
  });
  const data = await response.json();
  console.log("data", data);
  const book = data.output.content;
  return book;
};

const CHAT_API_URL = "http://localhost:8000/api/chatbot/author-info";

export const generateAuthorInfo = async (name, title) => {
  console.log("name", name);
  console.log("title", title);
  try {
    const response = await fetch(CHAT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, title }),
    });
    const data = await response.json();
    console.log("data", data);
    const author = data.output.content;
    return author;
  } catch (error) {
    console.error("Error getting author info:", error);
    throw error;
  }
};

const CHAT_QUIZ_API_URL = "http://localhost:8000/api/chatbot/quizzes";

export const generateQuizQuestions = async (name, title) => {
  try {
    const response = await fetch(CHAT_QUIZ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, title }),
    });
    const data = await response.json();
    const quizQuestions = data.output.content;

    return quizQuestions;
  } catch (error) {
    console.error("Error getting quiz questions:", error);
    throw error;
  }
};
