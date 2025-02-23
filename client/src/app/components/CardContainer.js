import React from "react";
import { Box, Grid } from "@mui/material";
import CustomGrid from "./CustomGrid";

// Colores base para el diseño
const rootStyles = {
  black: "#192531",
  white: "#FAFAFA",
  blue: "#00D3FF",
  green: "#00FF99",
};

const CardContainer = ({ CardComponent, data }) => {
  return (
    <Box sx={{ backgroundColor: rootStyles.white, p: 2 }}>
      <Grid
        container
        sx={{
          // backgroundColor: "red",

          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)", // 1 columna en móviles
            sm: "repeat(2, 1fr)", // 2 columnas en pantallas pequeñas
            md: "repeat(4, 1fr)", // 3 columnas en pantallas medianas y superiores
            xl: "repeat(5, 1fr)", // 4 columnas en pantallas grandes
        
          },
          gap: "10px",
          padding: "10px",
          nowrap: true,
        }}
      >
        {data.map((item, index) => (
          <Grid
            item
            sx={{ margin: "0px", display: "flex", justifyContent: "center", backgroundColor: rootStyles.white }}
            key={index}
          >
            <CardComponent {...item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CardContainer;
