import React, { useEffect, useState } from "react";

import CategoriesBar from "./components/Categories.js";
import { Route, Routes, useHref, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'


// components
import Footer from "./components/Footer";
import ScrollAnimate from "./components/ScrollAnimate.js";
import NavBar from "./components/NavBar";



import Home from "./pages/Home.js";
// import Error from "./pages/ErrorComponent/Error";


export default function App() {
  const [userStatus, setUserStatus] = useState()
  const dispatch = useDispatch();

  const fun = useSelector((state) => state);
  console.log("fun", fun);


  const [page, setPage] = useState("/")

  return (
    <div>
      <NavBar />
      <CategoriesBar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/home" element={<Home />} /> */}
        {/* <Route path="/token/:token" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment/:res" element={<Payment />} />
        <Route path="/products/:productId" element={<Detail />} />
        <Route path="/authorize" element={<Authorize />} />
        <Route path="/user" element={<User />} />
        <Route path="/questions" element={<Questions />} /> */}
        {/* <Route path="/error" element={<Error/>}/> */}
      </Routes>

     {/* {page !== "/" && <ScrollAnimate footer={<Footer />} />}  */}
    </div>
  );
}

