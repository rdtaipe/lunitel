import React, { useState, useEffect } from "react";
import { Box, Typography, Avatar, IconButton, Menu, MenuItem, Tooltip, Divider, } from "@mui/material";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { AiOutlineShoppingCart, AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

// Componentes personalizados
import Badge from "./Badge.js";
import Modal from "./Modal.js";
import SearchBar from "./SearchBar.js";

import logo from "../../assets/logoLight.png"

// Estilo de texto para los enlaces
const NavTextStyle = {
  mx: { xs: 2, lg: 4 },
  fontSize: "1rem",
  textDecoration: "none",
  color: "inherit",
  "&:hover": {
    color: "rgb(120, 120, 120)",
    transition: "all 0.4s ease",
  },
  whiteSpace: "nowrap",
};


const categories = [
  { title: "Tecnología", path: "/category/tecnologia" },
  { title: "Electrodomésticos", path: "/category/electrodomesticos" },
  { title: "Hogar y Muebles", path: "/category/hogar-muebles" },
  { title: "Deportes y Fitness", path: "/category/deportes-fitness" },
  { title: "Belleza y Cuidado Personal", path: "/category/belleza-cuidado" },
  { title: "Herramientas", path: "/category/herramientas" },
  { title: "Construcción", path: "/category/construccion" },
  { title: "Industrias y Oficinas", path: "/category/industrias-oficinas" },
  { title: "Juegos y Juguetes", path: "/category/juegos-juguetes" },
  { title: "Bebés", path: "/category/bebes" },
  { title: "Accesorios para Vehículos", path: "/category/accesorios-vehiculos" },
  { title: "Moda", path: "/category/moda" },
  { title: "Salud y Equipamiento Médico", path: "/category/salud-equipamiento" },
  { title: "Vehículos", path: "/category/vehiculos" },
  { title: "Inmuebles", path: "/category/inmuebles" },
  { title: "Tiendas Oficiales", path: "/category/tiendas-oficiales" },
  { title: "Más Vendidos", path: "/category/mas-vendidos" },
  { title: "Ver Más Categorías", path: "/category/ver-mas" },
];


const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { rootStyles } = useSelector((state) => state);
  const { cart } = useSelector(({ state }) => state.user);
  const { isAuthenticated, logout } = useAuth0();

  const [cartProducts, setCartProducts] = useState({ length: 0, total: 0 });
  const [openMenu, setOpenMenu] = useState(false);
  const [modal, setModal] = useState(false);

  // const userData = useSelector((state) => state.user.data);

  useEffect(() => {
    if (isAuthenticated) {
      // Lógica para obtener productos del carrito
    }
  }, [isAuthenticated]);

  const handleToggleMenu = () => setOpenMenu(!openMenu);

  const handleLogout = () => {
    logout({ returnTo: window.location.origin + "/home" });
    setModal(false);
  };

  const handleProfile = () => navigate(isAuthenticated ? "/user" : "/authorize");

  return (
    <>
      <nav
        style={{ background: rootStyles.black, color: rootStyles.white }}
        className="fixed top-0 left-0 z-50 flex flex-col   justify-evenly items-center w-full h-[100px] "
      >
        {/* Modal para confirmación de logout */}
        {modal && (
          <Modal
            title="Log out"
            message="Are you sure you want to leave?"
            onFalse={() => setModal(false)}
            onTrue={handleLogout}
          />
        )}

        <div className={`flex flex-row items-center h-[60px] `}>

          {/* Logo */}
          <div className="flex justify-center w-[200px] p-5">
            <NavLink to="/">
              <img src={logo} alt="logo" className="w-32" />
            </NavLink>
          </div>

          <Box
            className={`flex-col md:flex md:flex-row items-center ${openMenu ? "flex absolute top-[80px]" : "hidden md:flex"
              }`}
            style={{
              background: openMenu ? rootStyles.black : "transparent",
              width: openMenu ? "100%" : "auto",
            }}
          >
            <SearchBar />
          </Box>

          <Box display="flex" alignItems="center" className="pr-5 ml-8">
            <NavLink to="/cart">
              <Badge counter={cartProducts.length}>
                <AiOutlineShoppingCart size={30} />
              </Badge>
            </NavLink>

            <Tooltip title="Profile">
              <IconButton onClick={handleProfile}>
                 <Avatar sx={{width:30,height:30}} alt="{userData?.name}" src="https://thumbs.dreamstime.com/b/%D0%BF%D0%B5%D1%87%D0%B0%D1%82%D1%8C-woman-avatar-profile-female-face-icon-vector-illustration-190750711.jpg" />
              </IconButton>
            </Tooltip>
          </Box>
        </div>

        {/* navbar titles */}
        <Box display="flex" flexWrap="nowrap" justifyContent="center" gap={0} mb={1}>
          {categories.map((category, index) => (
            <Typography
              key={index}
              component={Link}
              to={category.path}
              sx={{
                ...NavTextStyle, // Espaciado entre elementos
                textAlign: "center",
              }}
            >
              {category.title}
            </Typography>
          ))}
        </Box>


        {/* Menú de hamburguesa */}
        <div className="md:hidden">
          <button className="p-3" onClick={handleToggleMenu}>
            {openMenu ? (
              <AiOutlineClose className="text-white" />
            ) : (
              <AiOutlineMenu className="text-white" />
            )}
          </button>
        </div>
      </nav>

      {/* Espaciado debajo del nav */}
      <div style={{ height: "80px" }} />
    </>
  );
};

export default NavBar;
