import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";

const SearchBar = () => {
  const dispatch = useDispatch();
  const { setter } = useSelector((state) => state.actions);
  const rootStyles = useSelector((state) => state.rootStyles)

  const [name, setName] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setter({ keys: "searchName", value: name }));
  };
  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
    dispatch(setter({ keys: "searchName", value: e.target.value }));
  };

  return (
    <div style={{ backgroundColor: rootStyles.white }} className="flex w-[100%] md:w-[270px] lg:w-[350px] h-[40px] rounded-[4px] ">
      <IconButton
        type="button"
        className="rounded-[4px] w-[40px] h-[40px] flex justify-center items-center"
        onClick={(e) => handleSubmit(e)}
      >
        <SearchIcon style={{ color: rootStyles.black }} />
      </IconButton>
      <input
        style={{ color: rootStyles.black, backgroundColor:rootStyles.white }}
        className=" pr-1 outline-none w-[100%] h-[100%] rounded-[4px]"
        placeholder="Search for any product"
        type="search"
        value={name}
      // onChange={(e) => handleInputChange(e)}
      />
    </div>
  );
};

export default SearchBar