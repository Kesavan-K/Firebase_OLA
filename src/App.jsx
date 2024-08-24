// src/App.js
import PropTypes from "prop-types";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminDashboard from "./components/AdminDashboard";
import Navbar from "./components/Navbar";
import CarList from "./fetchedData/CarList";
import BusList from "./fetchedData/BusList";
import VanList from "./fetchedData/VanList";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import Error from "./components/Error";

// import MyImageGallery from './components/Carousel';

const MainLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define a route that uses the MainLayout */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/login"
          element={
            <MainLayout>
              <Login />
            </MainLayout>
          }
        />
        <Route
          path="/register"
          element={
            <MainLayout>
              <Register />
            </MainLayout>
          }
        />
        <Route
          path="/admin-12346"
          element={
            <MainLayout>
              <AdminDashboard />
            </MainLayout>
          }
        />
        <Route
          path="/cars"
          element={
            <MainLayout>
              <CarList />
            </MainLayout>
          }
        />
        <Route
          path="/buses"
          element={
            <MainLayout>
              <BusList />
            </MainLayout>
          }
        />
        <Route
          path="/vans"
          element={
            <MainLayout>
              <VanList />
            </MainLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <MainLayout>
              <Contact />
            </MainLayout>
          }
        />
        {/* Define a route for errors without the MainLayout */}
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
