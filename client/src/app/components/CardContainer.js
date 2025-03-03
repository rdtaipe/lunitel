import React from "react";
import { Box, Grid } from "@mui/material";
import CustomGrid from "./CustomGrid";
import { isArray } from "lodash";

// Colores base para el diseño
const rootStyles = {
  black: "#192531",
  white: "#FAFAFA",
  blue: "#00D3FF",
  green: "#00FF99",
};

const CardContainer = ({ CardComponent, data  }) => {
console.log("data card",data)
  return (
    <Box sx={{
      // Padding alrededor del contenedor
      // p: { xs: 2, sm: 3, md: 4 , lg: 2, xl: 2 },
      // Sistema de Grid Responsive
      display: "grid",
      gap: 2,
      // 1 columna en móviles, 2 en pantallas medianas, 3 en pantallas grandes, 4 en extra grandes
      gridTemplateColumns: {
        xs: "1fr 1fr",
        sm: "1fr 1fr 1fr",
        md: "1fr 1fr 1fr 1fr",
        lg: "1fr 1fr 1fr 1fr 1fr",
        xl: "1fr 1fr 1fr 1fr 1fr 1fr",
      },
    }}>

      {isArray(data) && data.map((item, index) => (
        <Grid
          item
          sx={{ margin: "0px", display: "flex", justifyContent: "center", backgroundColor: rootStyles.white }}
          key={index}
        >
          <CardComponent {...item} />
        </Grid>
      ))}
    </Box>
  );
};

export default CardContainer;
