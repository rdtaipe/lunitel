import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes, useHref, useNavigate } from "react-router-dom";


// components

import CategoriesBar from "./components/Categories.js";


// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'


import Footer from "./components/Footer";
import ScrollAnimate from "./components/ScrollAnimate.js";
import NavBar from "./components/NavBar";



import Home from "./pages/Home.js";
import ContactBar from "./components/ContactBar.js";
// import Error from "./pages/ErrorComponent/Error";


export default function App() {
  const [userStatus, setUserStatus] = useState()
  const [categoriesData, setCategoriesData] = useState([]);

  const dispatch = useDispatch();
  const { get } = useSelector((state) => state.endpoint)



  const [page, setPage] = useState("/")

  useEffect(() => {
    // getData({ filter: { name: [search], ...filter }, sort: sort })

    const getCategoriesData = async () => {
      const data = await get("/categories");
      if (data) setCategoriesData(data);
    };
    getCategoriesData();




  }, []);


  return (
    <div>
      <ContactBar />
      <NavBar />
      {/* <CategoriesBar data={categoriesData} /> */}
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

