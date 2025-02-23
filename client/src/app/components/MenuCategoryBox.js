import React from 'react'
import { Box, Menu, MenuItem, Divider,Link} from '@mui/material'

export default function MenuCategoryBox({data}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    /// to upercase
    const toLowercase = (str) => {
        return str.toLowerCase();
    }


    return (
        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
        // sx={{ display: { md: "none" } }}
        >
            {data.map((item, i) => (
                <MenuItem
                    key={i}
                    onClick={handleMenuClose}
                    component={Link}
                    to={toLowercase(item.category)}
                >
                    {item.category}
                </MenuItem>
            ))}
            <Divider />
        </Menu>
    )
}
