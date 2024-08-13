import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Series from "./pages/Series";
import Quiz from "./pages/Quiz";
import PageNotFound from "./pages/PageNotFound";
import Blog from "./pages/Blog";
import Roadmap from "./pages/Roadmap";

import AdminLayout from "./components/admin/dashboardAdmin/layout/AdminLayout";
import DashboardAdmin from "./components/admin/dashboardAdmin";
import SerieDashboard from "./components/admin/series/";
import BooksDashboard from "./components/admin/books/";
import RoadmapDashboard from "./components/admin/roadmap/";
import QuizzesDashboard from "./components/admin/quizzes/";
import TopicTalks from "./pages/TopicTalks";
import About from "./pages/About";
import PP from "./pages/PP";
import Author from "./pages/Author";
import SingIn from "./pages/Auth/SingIn";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";

function App() {
  return (
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
  );
}

export default App;
