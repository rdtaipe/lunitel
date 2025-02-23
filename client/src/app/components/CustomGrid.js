import React from "react";
import { Box } from "@mui/material";

const CustomGrid = ({ children }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        gridTemplateRows: "1fr 1fr 1fr 1fr",
        gap: "10px 10px",
        justifyItems: "stretch",
        alignItems: "stretch",
        justifyContent: "start",
        alignContent: "start",
        gridAutoColumns: "auto",
        gridAutoRows: "auto",
        gridAutoFlow: "row",
      }}
    >
      {children}
    </Box>
  );
};

export default CustomGrid;
