import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
  Divider,
  Container,
  InputBase,
  Badge as MuiBadge,
} from "@mui/material";
import { styled } from "@mui/system";
import { AiOutlineShoppingCart, AiOutlineMenu } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import logo from "../../assets/logoLight.png"; // Actualiza la ruta del logo

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
const SearchBar = styled(InputBase)(({ theme }) => ({
  backgroundColor: "#f1f1f1",
  borderRadius: "5px",
  padding: "5px 10px",
  width: "100%",
  maxWidth: 400,
  marginLeft: theme.spacing(2),
}));

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const { rootStyles } = useSelector((state) => state);
  return (
    <AppBar position="sticky" elevation={1} sx={{ background: rootStyles.black }} >
      {/* Barra principal */}
      <Container maxWidth="xl">

        <Toolbar>
          {/* Menú hamburguesa en móviles */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
            sx={{ display: { md: "none" } }}
          >
            <AiOutlineMenu />
          </IconButton>

          {/* Logo */}
          <NavLink to="/">
            <Box component="img" src={logo} alt="logo" sx={{ width: 120, height: "auto" }} />
          </NavLink>

          {/* Barra de búsqueda */}
          <SearchBar placeholder="Buscar productos, marcas y más..." />

          {/* Iconos a la derecha */}
          <Box ml="auto" display="flex" alignItems="center">
            {/* Carrito */}
            <NavLink to="/cart">
              <MuiBadge badgeContent={3} color="primary">
                <AiOutlineShoppingCart size={24} />
              </MuiBadge>
            </NavLink>

            {/* Avatar del usuario */}
            <Tooltip title="Perfil">
              <IconButton sx={{ ml: 2 }}>
                <Avatar
                  src="https://thumbs.dreamstime.com/b/%D0%BF%D0%B5%D1%87%D0%B0%D1%82%D1%8C-woman-avatar-profile-female-face-icon-vector-illustration-190750711.jpg"
                  alt="Usuario"
                />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
        </Container >
        {/* Menú desplegable de categorías */}
        <Container maxWidth="xl">
          <Box display="flex" justifyContent="center" flexWrap="nowrap" overflow="auto">
            {categories.map((category, index) => (
              <Typography
                key={index}
                component={Link}
                to={category.path}
                sx={{
                  ...NavTextStyle,
                  px: 1,
                  whiteSpace: "nowrap",
                  color: rootStyles.white
                }}
              >
                {category.title}
              </Typography>
            ))}
          </Box>
        </Container>

        {/* Menú lateral para móviles */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          sx={{ display: { md: "none" } }}
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

export default NavBar;
