import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Tabs, Tab } from "@mui/material";

const mockCategories = [
    { id: 1, name: "Laptops" },
    { id: 2, name: "Escritorios" },
    { id: 3, name: "Monitores" },
    { id: 4, name: "Teclados" },
    { id: 5, name: "Ratones" },
    { id: 6, name: "Impresoras" },
    { id: 7, name: "Routers" },
    { id: 8, name: "Switches" },
    { id: 9, name: "Cables y Adaptadores" },
    { id: 10, name: "Almacenamiento Externo" },
    { id: 14, name: "Altavoces" },
    { id: 15, name: "Sillas Gamer" },
    { id: 16, name: "Fuentes de Poder" }
];

const CategoriesBar = () => {
  const categories =  mockCategories;
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "#192531" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        textColor="inherit"
        indicatorColor="primary"
        sx={{
          "& .MuiTabs-flexContainer": {
            justifyContent: "center",
          },
        }}
      >
        {categories.map((category, index) => (
          <Tab
            key={category.id}
            label={category.name}
            sx={{
              textTransform: "none",
              color: "#FAFAFA",
              "&.Mui-selected": { color: "#00FF99" },
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default CategoriesBar;
