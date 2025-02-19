import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

// Contenedor principal con animación
const MarqueeContainer = styled(Box)({
  display: "flex",
  overflow: "hidden",
  whiteSpace: "nowrap",
  position: "relative",
  width: "100%",
  backgroundColor: "#f5f5f5",
  padding: "10px 0",
});

// Contenido animado para efecto de desplazamiento infinito
const MarqueeContent = styled(Box)({
  display: "flex",
  animation: "marquee 20s linear infinite",
  minWidth: "200%",
  "@keyframes marquee": {
    "0%": { transform: "translateX(0)" },
    "100%": { transform: "translateX(-50%)" },
  },
});



const MarqueeBrands = ({data}) => {
  console.log(data)

  return (
    <MarqueeContainer>
      <MarqueeContent>
        {[...data, ...data].map((brand, index) => (
          <Box key={index} sx={{ mx: 2, textAlign: "center" }}>
            <img src={brand.image} alt={brand.name} style={{ height: 40, marginBottom: 4 }} />
            <Typography variant="body2">{brand.name}</Typography>
          </Box>
        ))}
      </MarqueeContent>
    </MarqueeContainer>
  );
};

export default MarqueeBrands;
