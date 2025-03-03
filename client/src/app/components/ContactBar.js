import React from "react";
import { AppBar, Toolbar, Typography, Link, Box, Container } from "@mui/material";
import { useSelector } from "react-redux";
// Icons
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';

const ContactBar = () => {
  const baseColors = useSelector((state) => state.style.baseColors.primary);
  console.log(baseColors.black);

  return (
    <AppBar position="static" sx={{ bgcolor: baseColors.black, color: baseColors.grayText, height: 20, width: "100%", m: 0, p: 0 }}>
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            color: "inherit",
            width: "100%",
            display: "flex",
            flexWrap: "nowrap",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 1,
            p: 0,
            mt: .5,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", m: 0, p: 0 }}>
            <Typography fontSize={11} sx={{ display: "flex", alignItems: "center" }}>
              <FmdGoodOutlinedIcon fontSize="small" sx={{ height: 16, mb: .5 }} />
              Oropesa, Cusco 08204
            </Typography>

          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography fontSize={11} sx={{ display: "flex", alignItems: "center", }}>
              <Link href="https://api.whatsapp.com/send?phone=51974578644" target="_blank" rel="noopener" sx={{ color: "inherit", textDecoration: "none", display: "flex", alignItems: "center" }}>
                <WhatsAppIcon fontSize="small" sx={{ height: 16, mr: .2 }} />
                +51 974 578 644
              </Link>
            </Typography>
            <Typography fontSize={11} sx={{ display: "flex", alignItems: "center" }}>
              <Link href="mailto:ubiquitilux@gmail.com" target="_blank" rel="noopener" sx={{ color: "inherit", textDecoration: "none", display: "flex", alignItems: "center" }}>
                <MailOutlineIcon fontSize="small" sx={{ height: 16, mr: .2 }} />
                ubiquitilux@gmail.com
              </Link>
            </Typography>

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ContactBar;
