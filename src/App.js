import "./App.css";
import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";

// Import layouts
import Layout from "./layout/Layout";
import AdminLayout from "./components/admin/dashboardAdmin/layout/AdminLayout";

// Lazy load components
const Home = lazy(() => import("./pages/Home"));
const Books = lazy(() => import("./pages/Books"));
const Series = lazy(() => import("./pages/Series"));
const Quiz = lazy(() => import("./pages/Quiz"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Blog = lazy(() => import("./pages/Blog"));
const Roadmap = lazy(() => import("./pages/Roadmap"));
const TopicTalks = lazy(() => import("./pages/TopicTalks"));
const About = lazy(() => import("./pages/About"));
const PP = lazy(() => import("./pages/PP"));
const Author = lazy(() => import("./pages/Author"));
const SingIn = lazy(() => import("./pages/Auth/SingIn"));
const Register = lazy(() => import("./pages/Auth/Register"));
const ForgotPassword = lazy(() => import("./pages/Auth/ForgotPassword"));
const Profile = lazy(() => import("./pages/Profile"));
const Contact = lazy(() => import("./pages/Contact"));

// Lazy load admin components
const DashboardAdmin = lazy(() => import("./components/admin/dashboardAdmin"));
const SerieDashboard = lazy(() => import("./components/admin/series"));
const BooksDashboard = lazy(() => import("./components/admin/books"));
const RoadmapDashboard = lazy(() => import("./components/admin/roadmap"));
const QuizzesDashboard = lazy(() => import("./components/admin/quizzes"));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:id" element={<Books />} />
          <Route path="/series/" element={<Series />} />
          <Route path="/series/:id" element={<Series />} />
          <Route path="/authors/:id" element={<Author />} />
          <Route path="/roadmap/" element={<Roadmap />} />
          <Route path="/roadmap/:id" element={<Roadmap />} />
          <Route path="/quizzes" element={<Quiz />} />
          <Route path="/quizzes/:id" element={<Quiz />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/about/" element={<About />} />
          <Route path="/privacy-policy" element={<PP />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sign-in" element={<SingIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/profile/" element={<Profile />} />
          <Route path="/topic-talks" element={<TopicTalks />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
        <Route element={<AdminLayout />}>
          <Route path="/admin/sign-in" element={<SingIn />} />
          <Route path="/admin/books" element={<BooksDashboard />} />
          <Route path="/admin/series" element={<SerieDashboard />} />
          <Route path="/admin/roadmap" element={<RoadmapDashboard />} />
          <Route path="/admin/quizzes" element={<QuizzesDashboard />} />
          <Route path="/admin/dashboard" element={<DashboardAdmin />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
