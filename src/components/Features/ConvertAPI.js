// Function to convert slug back to book title
export const convertSlugToTitle = (slug) => {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const convertTitleToSlug = (title) => {
  if (!title) return "";
  return title
    .toLowerCase()
    .split(" ")
    .map((word) => word.replace(/[^a-z0-9]/g, ""))
    .filter((word) => word.length > 0)
    .join("-");
};
