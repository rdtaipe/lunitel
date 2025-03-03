/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import { useSelector } from "react-redux";
import { AppBar, Container } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
}

export default function ProductBreadcrumbs() {
    const action = useSelector((state) => state.actions);
    const { get } = action.get("endpoint")
    const baseColors = action.get("style.baseColors.primary")

    return (
        <AppBar position="sticky" elevation={0} sx={{ height: "24px", background: baseColors.green, top: 60,  }}  >
            <Container maxWidth="xl" sx={{ height: "100%", }} >
                <Breadcrumbs maxItems={2} itemsBeforeCollapse={2} aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="#">
                        Home
                    </Link>
                    <Link underline="hover" color="inherit" href="#">
                        Products
                    </Link>
                    <Link underline="hover" color="inherit" href="#">
                        Electronics
                    </Link>
                    <Typography sx={{ color: "text.primary" }}>Smartphones</Typography>
                </Breadcrumbs>
            </Container>
        </AppBar>
    );
}
