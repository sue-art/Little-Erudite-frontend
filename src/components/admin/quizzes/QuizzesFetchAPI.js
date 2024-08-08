const serverurl = process.env.REACT_APP_SERVER_API_URL;
const API_URL = `${serverurl}/api/quizzes`;

// Fetch all Quizzes

export const getAllQuizzes = async () => {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

export const getQuizById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

//Fetch a quiz by book name
export const getQuizByBookId = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

//Fetch a quiz by quiz title
export const getQuizByTitle = async (title) => {
  const response = await fetch(`${API_URL}/byTitle/${title}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (data.message === "Book not found") {
    return data.message;
  }
  return data;
};

//Create a new quiz
export const createQuiz = async (quiz) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quiz),
  });
  const data = await response.json();
  return data;
};

//update a quiz
export const updateQuiz = async (quiz) => {
  const response = await fetch(`${API_URL}/${quiz._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quiz),
  });

  const data = await response.json();
  return data;
};

//delete a quiz
export const deleteQuiz = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};
