const serverurl = process.env.REACT_APP_SERVER_API_URL;
const API_URL = `${serverurl}/api/vocabulary`;

//Fetch vocabulary by title

export const getVocabularyByTitle = async (title) => {
  const response = await fetch(`${API_URL}/byTitle/${title}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log(title);

  return data;
};
