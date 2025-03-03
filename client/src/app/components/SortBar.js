import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import {
  Container,
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
  TextField,
  IconButton,
  Divider
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import _ from "lodash";

const sortByPopular = (products) => _.orderBy(products, ["sellCount"], ["desc"]);
const sortByOffer = (products) => _.orderBy(products, ["discount"], ["desc"]);
const sortByPriceAsc = (products) => _.orderBy(products, ["price"], ["asc"]);
const sortByPriceDesc = (products) => _.orderBy(products, ["price"], ["desc"]);
// Simulamos "nuevos" ordenando por precio desc (podrías usar "createdAt" si existiera)
const sortByNew = (products) => _.orderBy(products, ["price"], ["desc"]);


export default function SortBar() {

  const action = useSelector((state) => state.actions);
  const BaseColor = action.get("style.baseColors.primary");
  const allProducts = action.get("data.products");
  // Estado local
  const [products, setProducts] = useState(allProducts);
  const [activeSort, setActiveSort] = useState("popular");
  const categories = action.get("data.categories");
  const router = action.get("router");

  // Para el menú desplegable de orden
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  // Para mostrar/ocultar filtros
  const [showFilters, setShowFilters] = useState(false);

  // Maneja la apertura/cierre del menú de ordenamiento
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // Aplica el ordenamiento según la opción seleccionada
  const handleSort = (sortType) => {
    let sortedProducts = [];
    switch (sortType) {
      case "popular":
        sortedProducts = sortByPopular(products);
        break;
      case "offer":
        sortedProducts = sortByOffer(products);
        break;
      case "priceAsc":
        sortedProducts = sortByPriceAsc(products);
        break;
      case "priceDesc":
        sortedProducts = sortByPriceDesc(products);
        break;
      case "new":
        sortedProducts = sortByNew(products);
        break;
      default:
        sortedProducts = products;
    }
    setActiveSort(sortType);
    setProducts(sortedProducts);
    handleCloseMenu();
  };



  const toCategory = (str)=> router.util.toCategory(str)

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      {/* 
        Barra superior (estilo Dribbble):
        - Botón desplegable de orden ("Popular")
        - Lista de categorías
        - Botón "Filters"
      */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        {/* IZQUIERDA: Menú desplegable (Popular / Nuevos / Oferta / Precio...) + Categorías */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Botón de orden */}
          <Box>
            <Button
              variant="outlined"
              onClick={handleOpenMenu}
              endIcon={<ArrowDropDownIcon />}
              sx={{
                textTransform: "none",
                borderColor: BaseColor,
                color: "text.primary",
              }}
            >
              {/* Mostramos el texto según la opción seleccionada */}
              {activeSort === "popular"
                ? "Popular"
                : activeSort === "offer"
                  ? "En Oferta"
                  : activeSort === "priceAsc"
                    ? "Precio: Menor a Mayor"
                    : activeSort === "priceDesc"
                      ? "Precio: Mayor a Menor"
                      : activeSort === "new"
                        ? "Nuevos"
                        : "Ordenar"}
            </Button>

            {/* Menú con las opciones de orden */}
            <Menu anchorEl={anchorEl} open={openMenu} onClose={handleCloseMenu}>
              <MenuItem onClick={() => handleSort("popular")}>Popular</MenuItem>
              <MenuItem onClick={() => handleSort("new")}>Nuevos</MenuItem>
              <MenuItem onClick={() => handleSort("offer")}>En Oferta</MenuItem>
              <MenuItem onClick={() => handleSort("priceAsc")}>
                Precio: Menor a Mayor
              </MenuItem>
              <MenuItem onClick={() => handleSort("priceDesc")}>
                Precio: Mayor a Menor
              </MenuItem>
            </Menu>
          </Box>

          {/* Categorías en forma de botones (o Links) */}
          {categories.map((item, i) => (
            //NavLink
            <NavLink
              key={i}
              to={toCategory(item.category)}
              style={{
                textDecoration: "none",
                color: "text.primary",
                "&:hover": { color: BaseColor },
              }}
            >
              <Button
                variant="text"
                sx={{
                  textTransform: "none",
                  color: "text.primary",
                  "&:hover": { backgroundColor: "#f5f5f5" },
                }}
              >
                {item.category}
              </Button>
            </NavLink>

          ))}
        </Box>

        {/* DERECHA: Botón de "Filters" */}
        <Box>
          <IconButton
            onClick={() => setShowFilters(!showFilters)}
            sx={{ border: "1px solid #ccc", borderRadius: 2, mr: 1 }}
          >
            <FilterListIcon />
          </IconButton>
        </Box>
      </Box>

      {/* 
        Barra inferior de filtros (Tags, Color, Timeframe)
        Se muestra solo si showFilters === true
      */}
      {showFilters && (
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            mb: 2,
            p: 2,
            border: "1px solid #eee",
            borderRadius: 1,
          }}
        >
          <TextField
            label="Tags"
            placeholder="Enter your search"
            size="small"
            sx={{ width: 200 }}
          />
          <TextField
            label="Color"
            placeholder="Pick a color"
            size="small"
            sx={{ width: 200 }}
          />
          <TextField
            label="Timeframe"
            placeholder="Now"
            size="small"
            sx={{ width: 200 }}
          />
        </Box>
      )}

      <Divider sx={{ mb: 2 }} />

  
    </Container>
  );
}
