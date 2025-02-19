import React from "react";
import { Box, Grid } from "@mui/material";

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
        spacing={2} 
        justifyContent="center"
        sx={{ maxWidth: 1200, margin: 0 }}
      >
        {data.map((item, index) => (
          <Grid item xs={6} sm={6} md={4} lg={3} xl={2} key={index}>
            {/* Se renderiza la card con la data correspondiente */}
            <CardComponent {...item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CardContainer;

