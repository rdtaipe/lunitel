import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, TextField, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ placeholder }) => {
  const dispatch = useDispatch();
  // const { setter } = useSelector((state) => state.actions);
  const baseColors = useSelector((state) => state.style.baseColors.primary);

  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(setter({ keys: "searchName", value: name }));
  };

  const handleInputChange = (e) => {
    setName(e.target.value);
    // dispatch(setter({ keys: "searchName", value: e.target.value }));
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: { xs: "100%", md: "350px", lg: "400px" },
        height: "40px",
        bgcolor: baseColors.white,
        borderRadius: "10px",
      }}
    >

      <TextField
        fullWidth
        variant="standard"
        placeholder={placeholder || "Search for any product"}
        value={name}
        onChange={handleInputChange}
        InputProps={{
          disableUnderline: true,
          sx: {pl: 2, color: baseColors.black, backgroundColor: baseColors.white, height: "100%", borderRadius: "100%" },
        }}
      />
      <IconButton disableRipple onClick={handleSubmit} sx={{ bgcolor: baseColors.white, borderRadius: "100%", width: "40px", height: "40px" }}>
        <SearchIcon sx={{ color: baseColors.black }} />
      </IconButton>
    </Box>
  );
};

export default SearchBar;
