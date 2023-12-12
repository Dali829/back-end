import React from "react";
import Index from "./views/indexPage/indexPage";
import Home from "./views/homePage/homePage";
import Login from "./views/login/login";
import ShopCart from './views/cartPage/cartPage'
import Register from "./views/signIn/signIn";
import { Routes, Route } from "react-router-dom";
import Products from './views/products/product' ;
function Routers() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/index" element={<Index />} />
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/shopCart" element={<ShopCart />} />
        </Routes>
    </>
  );
}

export default Routers;
