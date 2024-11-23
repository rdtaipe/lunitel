import React, { useEffect, useState } from "react";
import Home from "./pages/Home.js";
import { Route, Routes, useHref, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";

import { useSelector, useDispatch } from "react-redux";
// import ScrollAnimate from "./components/ScrollAnimate.js";
 import NavBar from "./components/NavBar";


import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'

import Button from '@mui/material/Button'
// import Error from "./pages/ErrorComponent/Error";
const server = {
  local: "http://localhost:5000",
  production: "https://wgxjjo-5000.csb.app",
};

export default function App() {
  const [userStatus, setUserStatus] = useState()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setter, auth, url } = useSelector(({ state }) => state.server);

//   const href = useHref();
//   dispatch(setter({ keys: "state.server.url", value: server.production}));
 const [page, setPage] = useState("/")
//   useEffect(() => {
//     setPage(href);
//   }, [href]);



  return (
    <div>
    {page !== "/" && page != '/error' && <NavBar />} 
      <Routes>
        <Route path="/" element={<h1>hola</h1>} />
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

      {/* {page !== "/" && <ScrollAnimate footer={<Footer />} />} */}
    </div>
  );
}

