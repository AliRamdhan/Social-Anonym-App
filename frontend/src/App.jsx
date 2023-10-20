import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRouter";
import { Provider } from "react-redux";
import store from "./store";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import Welcome from "./pages/Welcome";
import Solusi from "./pages/Solusi";
import Cerita from "./pages/Cerita";
import Artikel from "./pages/Artikel";
import Profile from "./pages/Profile";
import Solusi_Details from "./pages/Solusi_Details";
import Cerita_Details from "./pages/Cerita_Details";
import Cerita_Genre from "./pages/Cerita_Genre";
import Artikel_Details from "./pages/Artikel_Details";
import DashboardAdmin from "./pages/Admin/DashboardAdmin";
import CreateArticle from "./pages/Admin/CRUD-Article/CreateArtikel";
import EditArticle from "./pages/Admin/CRUD-Article/EditArtikel";
import DetailsArticle from "./pages/Admin/CRUD-Genre/DetailsGenre";
import Genre from "./pages/Admin/Genre";
import EditGenre from "./pages/Admin/CRUD-Genre/EditGenre";
import CreateGenre from "./pages/Admin/CRUD-Genre/CreateGenre";
import DetailsGenre from "./pages/Admin/CRUD-Genre/DetailsGenre";
import ArtikelAdmin from "./pages/Admin/Artikel";
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/solusi" element={<Solusi />} />
          <Route path="/solusi/:solusiId" element={<Solusi_Details />} />
          <Route path="/cerita" element={<Cerita />} />
          <Route path="/cerita/:ceritaId" element={<Cerita_Details />} />
          <Route path="/cerita/genre/:genreName" element={<Cerita_Genre />} />
          <Route path="/artikel" element={<Artikel />} />
          <Route
            path="/artikel/:artikelId/:artikelTitle"
            element={<Artikel_Details />}
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <DashboardAdmin />
              </ProtectedRoute>
            }
          />
          {/* Genre Admin */}
          <Route
            path="/admin/genre"
            element={
              <ProtectedRoute>
                <Genre />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/genre/create"
            element={
              <ProtectedRoute>
                <CreateGenre />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/genre/edit/:genreId"
            element={
              <ProtectedRoute>
                <EditGenre />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/genre/:genreId"
            element={
              <ProtectedRoute>
                <DetailsGenre />
              </ProtectedRoute>
            }
          />
          *{/* Artikel  Admin*/}
          <Route
            path="/admin/artikel"
            element={
              <ProtectedRoute>
                <ArtikelAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/article/:articleId"
            element={
              <ProtectedRoute>
                <DetailsArticle />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/article/create"
            element={
              <ProtectedRoute>
                <CreateArticle />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/edit/:articleId"
            element={
              <ProtectedRoute>
                <EditArticle />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
