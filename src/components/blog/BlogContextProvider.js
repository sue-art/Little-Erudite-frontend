import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useCallback,
} from "react";
import { getAllPosts } from "../../service/contentful";
import { filters } from "../../service/GoogleBooksAPI";

// Create the initial state for the blog context
const initialState = {
  posts: [],
  filteredPosts: [],
  post: null,
  loading: true,
};

// Create the reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_POSTS":
      return {
        ...state,
        filteredPosts: action.payload,
        posts: action.payload,
      };

    case "FILTER_POSTS":
      if (action.payload === "All") {
        return {
          ...state,
          filteredPosts: state.posts,
        };
      } else {
        return {
          ...state,
          filteredPosts: state.posts.filter(
            (post) => post.fields.category === action.payload
          ),
        };
      }

    case "ADD_POSTS":
      return {
        ...state,
        posts: [...state.blogs, action.payload],
      };
    case "REMOVE_POSTS":
      return {
        ...state,
        posts: state.blogs.filter((blog) => blog.id !== action.payload),
      };
    case "UPDATE_POSTS":
      return {
        ...state,
        posts: state.posts.map((blog) =>
          blog.id === action.payload.id ? action.payload : blog
        ),
      };
    case "GET_POST":
      return {
        ...state,
        post: state.posts.find((post) => post.fields.slug === action.payload),
      };
    case "SEARCH_POSTS":
      return {
        ...state,
        posts: state.blogs.filter((blog) =>
          blog.title.toLowerCase().includes(action.payload.toLowerCase())
        ),
      };

    case "LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

// Create the BlogContext
export const BlogContext = createContext();

// Create the BlogContextProvider component
export const BlogContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { posts, post } = state;

  const fetchData = useCallback(async () => {
    try {
      const data = await getAllPosts();
      // Filter for blog posts
      const sortedBlogPosts = data.filter(
        (post) => post.sys.contentType.sys.id === "blogPost"
      );
      dispatch({
        type: "SET_POSTS",
        payload: sortedBlogPosts,
      });
      dispatch({ type: "LOADING", payload: false });
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  });

  useEffect(() => {
    if (posts.length === 0) {
      fetchData();
    }
  }, [fetchData]);

  return (
    <BlogContext.Provider value={{ state, posts, post, dispatch }}>
      {children}
    </BlogContext.Provider>
  );
};

export const usePosts = () => useContext(BlogContext);
