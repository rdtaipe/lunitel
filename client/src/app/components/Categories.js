import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Tabs, Tab } from "@mui/material";


const CategoriesBar = ({data}) => {
  const categories =  data || [];
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
        {categories.map((item, index) => (
          <Tab
            key={item.id}
            label={item.category}
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
