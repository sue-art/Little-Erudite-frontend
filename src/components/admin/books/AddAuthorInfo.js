async function createAuthorInfo(openaiServerLink) {
  try {
    // Make a request to the OpenAI server using the provided link
    const response = await fetch(openaiServerLink);

    // Check if the request was successful
    if (response.ok) {
      // Parse the response as JSON
      const data = await response.json();

      // Extract the author information from the data
      const authorInfo = data.author;

      // Return the author information
      return data;
    } else {
      // Handle the error if the request was not successful
      throw new Error("Failed to fetch author information");
    }
  } catch (error) {
    // Handle any other errors that may occur
    console.error(error);
    return null;
  }
}
