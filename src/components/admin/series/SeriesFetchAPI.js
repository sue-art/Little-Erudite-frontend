const serverurl = process.env.REACT_APP_SERVER_API_URL;
const API_URL = `${serverurl}/api/series`;

// Fetch all series
export const getAllSeries = async () => {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

// Fetch series by Name
export const getSeriesByName = async (name) => {
  const response = await fetch(`${API_URL}/byName/${name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

// Create a new series
export const createSeries = async (seriesData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(seriesData),
  });
  const data = await response.json();
  return data;
};

// Update an existing series
export const updateSeries = async (seriesData) => {
  const response = await fetch(`${API_URL}/${seriesData._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(seriesData),
  });
  const data = await response.json();
  return data;
};

//Delete a series
export const deleteSeries = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};
