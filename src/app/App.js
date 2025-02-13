import React, { useEffect, useState } from "react";
import Home from "./pages/Home.js";
import CategoriesBar from "./components/Categories.js";
import { Route, Routes, useHref, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";

import { useSelector, useDispatch } from "react-redux";
import ScrollAnimate from "./components/ScrollAnimate.js";
import NavBar from "./components/NavBar";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'

import Button from '@mui/material/Button'
// import Error from "./pages/ErrorComponent/Error";
const server = {
  local: "http://localhost:5000",
  production: "https://wgxjjo-5000.csb.app",
};
const breakpoints = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

const rootStyles = {
  black: "#192531",
  white: "#FAFAFA",
  blue: "#00D3FF",
  creen: "#00FF99",
}

export default function App() {
  const [userStatus, setUserStatus] = useState()
  const dispatch = useDispatch();

  const { setter} = useSelector(({ state }) => state.server);

  dispatch(setter({ keys: "rootStyles", value: rootStyles }));
  
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

      {page !== "/" && <ScrollAnimate footer={<Footer />} />}
    </div>
  );
}

