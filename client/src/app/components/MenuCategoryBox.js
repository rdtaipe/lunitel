import React, { useState, useEffect } from "react";
import { Menu, MenuItem, Divider, Badge as MuiBadge, } from "@mui/material";
import { styled } from "@mui/system";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";




export default function MenuCategoryBox({ anchorEl,setAnchorEl }) {
    const action = useSelector((state) => state.actions);


    const deviceType = action.get("style.settings.device")
    const baseColors = action.get("style.baseColors.primary")
    const router = action.get("router");
    console.log(router)

    const categories = action.get("data.categories");
    
    // const anchorEl = action.get("menu.anchorEl");
    const handleMenuClose = () => {
        setAnchorEl(null);
    }

    const toLowerCaseText = (str)=> router.util.toLower(str)
    const toCategory = (str)=> router.util.toCategory(str)
    


    return (
        <Menu
            elevation={0}
            gap={20}
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",

            }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
            PaperProps={{
                style: {
                    borderRadius: "4px",
                    boxShadow: "0px 8px 12px rgba(50, 50, 50, 0.2)",
                },
            }}
            sx={{
                "& .MuiMenuItem-root": {
                    width: "400px",
                    color: baseColors.black,
                    fontSize: "1rem",
                    "&:hover": {
                        color: baseColors.blue,
                        transition: "all 0.3s ease",
                    },
                }

            }}




        >
            {categories.map((item, index) => (
                toLowerCaseText(item.category) === "pupulares" ?
                    <>
                        <MenuItem
                            key={index}
                            onClick={handleMenuClose}
                            component={Link}
                            to={toCategory(item.category)}
                        >
                            {item.category}

                        </MenuItem> <Divider sx={{ bgcolor: baseColors.black, width: "100%" }} /></> :
                    <MenuItem
                        key={index}
                        onClick={handleMenuClose}
                        component={Link}
                        to={toCategory(item.category)}

                    >
                        {item.category}
                    </MenuItem>
            ))}

        </Menu>
    )
}
