import { createClient } from "contentful";

//REACT_APP_CONTENTFUL_SPACE_ID = zp7r3kg0gmyz;
//REACT_APP_CONTENTFUL_ACCESS_TOKEN = svahcM8LP51Z9BoY4XVFYqUK5A5GoIr7mq7mv9tkEN4;

const client = createClient({
  space: "zp7r3kg0gmyz",
  accessToken: "svahcM8LP51Z9BoY4XVFYqUK5A5GoIr7mq7mv9tkEN4",
});

const getAllPosts = () => {
  return client
    .getEntries()
    .then((response) => response.items)
    .catch(console.error);
};

export { client, getAllPosts };
