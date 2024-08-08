const serverurl = process.env.REACT_APP_SERVER_API_URL;
const API_URL = `${serverurl}/api/authors`;

// Fetch all authors
export const getAllAuthors = async () => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const authors = await response.json();
    return authors;
  } catch (error) {
    console.error("Error fetching authors:", error);
    throw error;
  }
};

// create a new author
export const createAuthor = async (author) => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(author),
    });
    const newAuthor = await response.json();

    return newAuthor;
  } catch (error) {
    console.error("Error creating author:", error);
    throw error;
  }
};

// Fetch author by name
export const getAuthorByName = async (name) => {
  try {
    const response = await fetch(`${API_URL}/byAuthor/${name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching author ${name}:`, error);
    throw error;
  }
};

// Fetch author by id
export const getAuthorById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const author = await response.json();
    return author;
  } catch (error) {
    console.error(`Error fetching author ${id}:`, error);
    throw error;
  }
};

export const getAuthorIdsByName = async (name) => {
  try {
    const response = await fetch(`${API_URL}/getid/${name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Assuming the response is an array of author IDs
    const authors = await response.json();

    // Check if the response is an array
    if (Array.isArray(authors)) {
      return authors;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error(`Error fetching author IDs for ${name}:`, error);
    throw error;
  }
};
