import React from "react";
import { Box } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
import Navbar from "../NavbarComponents/Navbar";
import HomePageContent from "./HomePageContent";
import Footer from "../FooterComponents/Footer";
import OrdersPage from "../OrderComponents/OrderPage";
import Delivery from "../DeliveryComponents/Delivery";
import Cart from "../CartComponents/Cart";
import CheckoutPage from "../CheckoutpageComponents/CheckoutPage";
import LoginCard from "../AuthenticationComponents/LoginCard";
import RegisterCard from "../AuthenticationComponents/RegisterCard";


const HomePage = () => {
  return (
    <Router>
      <Navbar />
      <Box 
        sx={{ minHeight: 'calc(100vh - 200px)' }}
      >
        <Routes>
          <Route path="" element={<HomePageContent />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="delivery" element={<Delivery />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="login" element={<LoginCard />} />
          <Route path="register" element={<RegisterCard />} />
        </Routes>
      </Box>
      <Footer />
    </Router>
  );
};

export default HomePage