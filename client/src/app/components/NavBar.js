import React, { useState } from "react";
import { AppBar, Box, Tabs, Tab, Toolbar, Typography, IconButton, Avatar, Tooltip, Menu, MenuItem, Divider, Container, InputBase, Badge as MuiBadge, } from "@mui/material";
import { styled } from "@mui/system";
import { AiOutlineShoppingCart, AiOutlineMenu, AiOutlineNotification } from "react-icons/ai";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";


import SearchBar from "./SearchBar.js";
import logo from "../../assets/logo.svg"; // Actualiza la ruta del logo
import icon from "../../assets/icon.svg";

// Estilo de texto para los enlaces
const NavTextStyle = {
  mx: { lg: 2 },
  fontSize: "1rem",
  textDecoration: "none",
  color: "inherit",
  "&:hover": {
    color: "rgb(120, 120, 120)",
    transition: "all 0.4s ease",
  },
};

// Categorías de ejemplo
const categories = [
  { title: "Tecnología", path: "/category/tecnologia" },
  { title: "Electrodomésticos", path: "/category/electrodomesticos" },
  { title: "Deportes y Fitness", path: "/category/deportes-fitness" },
  { title: "Belleza y Cuidado Personal", path: "/category/belleza-cuidado" },
  { title: "Herramientas", path: "/category/herramientas" },
  { title: "Construcción", path: "/category/construccion" },
  { title: "Industrias y Oficinas", path: "/category/industrias-oficinas" },
  { title: "Juegos y Juguetes", path: "/category/juegos-juguetes" },
  { title: "Bebés", path: "/category/bebes" },
];

// Componentes estilizados


export default function NavBar({ }) {
  const action = useSelector((state) => state.actions);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const deviceType = action.get("style.settings.device")
  const baseColors = action.get("style.baseColors.primary")

  action.set({ key: "test.obj.b.1.a", value: 300 })
  console.log(action.get("test.obj.b.1"))
  

  return (
    <AppBar position="sticky" elevation={0} sx={{ height: "60px", background: baseColors.black }} >
      {/* Barra principal */}
      <Container maxWidth="xl" sx={{ height: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>

        {/* 1 */}
        <Box sx={{ display: "flex", alignItems: "center", height: "100%", gap: 2 }}>
          <NavLink to="/">
            {deviceType === "desktop" ?
              <Box component="img" src={logo} alt="logo" sx={{ width: 120, height: "auto" }} />
              :
              <Box component="img" src={icon} alt="logo" sx={{ width: 40, height: "auto" }} />
            }
          </NavLink>
          <SearchBar placeholder="Buscar productos" />

          {/* categories */}
          <Box sx={{ display: "flex", alignItems: "center", ml: 0, gap: 0, }}>
            <Tabs
              orientation="horizontal"

              variant="scrollable"
              scrollButtons="auto"
              indicatorColor="primary"

              sx={{
                maxWidth: "320px",
                "& .MuiTabs-flexContainer": {
                  justifyContent: "center",
                },
              }}
            >

              <Tab
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <span>Productos</span>
                    <KeyboardArrowDownOutlinedIcon />
                  </Box>
                }
                disableRipple={true}
                sx={{
                  textTransform: "none",
                  color: baseColors.white,
                  fontSize: "1rem",

                  "&.Mui-selected": {
                    color: "#787878",
                  },
                }}
                onClick={handleMenuOpen}
              />

              <Tab
                label={"Ofertas"}
                disableRipple={true}
                sx={{
                  textTransform: "none",
                  color: baseColors.white,
                  fontSize: "1rem",
                  // HOVER
                  "&:hover": {
                    color: baseColors.blue,
                    transition: "all 0.3s ease",

                  },
                }}
              />

            </Tabs>

          </Box>
        </Box>
        {/*menu categiries, search bar  */}
        {/* <Box sx={{ display: "flex", flexDirection: deviceType === "desktop" ? "row" : "row-reverse", alignItems: "center", height: "40px", borderRadius: "4px", border: "1px solid " + baseColors.white }}>

          <IconButton
            aria-label="menu"
            onClick={handleMenuOpen}
            sx={{
              position: "relative",
              color: baseColors.white
            }}
          // sx={{ display: { md: "none" } }}
          >
            <AiOutlineMenu />
          </IconButton>

        </Box> */}
        {/* carr shop , client profile */}

        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
          <Tooltip title="Carrito">
            <IconButton sx={{ ml: 1 }}
              component={Link}
              to="/cart"
            >
              <MuiBadge badgeContent={3} sx={{
                mt: 1, mr: .5,
                color: baseColors.blue,
                "& .MuiBadge-badge": {
                  backgroundColor: baseColors.green,
                  color: baseColors.black,
                  fontWeight: "bold",
                },
              }}>
                <AiOutlineShoppingCart size={24} />
              </MuiBadge>
            </IconButton>
          </Tooltip>

          <Tooltip title="Perfil">
            <IconButton sx={{ ml: 1 }}>
              <MuiBadge
                badgeContent={6}
                sx={{
                  mt: 1,
                  color: baseColors.blue,
                  "& .MuiBadge-badge": {
                    backgroundColor: baseColors.green,
                    color: baseColors.black,
                    fontWeight: "bold",
                  },
                }}
              >
                <Avatar
                  sx={{ width: 24, height: 24 }}
                  src="https://thumbs.dreamstime.com/b/%D0%BF%D0%B5%D1%87%D0%B0%D1%82%D1%8C-woman-avatar-profile-female-face-icon-vector-illustration-190750711.jpg"
                  alt="Usuario"
                />
              </MuiBadge>
            </IconButton>
          </Tooltip>


        </Box>
      </Container >


      {/* Menú lateral para móviles */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      // sx={{ display: { md: "none" } }}
      >
        {categories.map((category, index) => (
          <MenuItem
            key={index}
            onClick={handleMenuClose}
            component={Link}
            to={category.path}
          >
            {category.title}
          </MenuItem>
        ))}
        <Divider />
      </Menu>
    </AppBar>
  );
};

