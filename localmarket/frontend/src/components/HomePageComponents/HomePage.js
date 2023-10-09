import React from "react";
import { Box } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Navbar from "../NavbarComponents/Navbar";
import HomePageContent from "./HomePageContent";
import Footer from "../FooterComponents/Footer";
import OrdersPage from "../OrderComponents/OrderPage";
import Delivery from "../DeliveryComponents/Delivery";
import Cart from "../CartComponents/Cart";
import CheckoutPage from "../CheckoutpageComponents/CheckoutPage";
import LoginCard from "../AuthenticationComponents/LoginCard";
import RegisterCard from "../AuthenticationComponents/RegisterCard";
import NotFound from "../NotFound/NotFound";

const HomePage = () => {
  const isAuthenticated = !!localStorage.getItem('token'); // Check if token is present

  return (
    <Router>
      <Navbar />
      <Box sx={{ minHeight: 'calc(100vh - 200px)' }}>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <HomePageContent />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="orders"
            element={
              isAuthenticated ? (
                <OrdersPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="delivery"
            element={
              isAuthenticated ? (
                <Delivery />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="cart"
            element={
              isAuthenticated ? (
                <Cart />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="checkout"
            element={
              isAuthenticated ? (
                <CheckoutPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="login" element={<LoginCard />} />
          <Route path="register" element={<RegisterCard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
      <Footer />
    </Router>
  );
};

export default HomePage;
