import React from "react";
import { Box, Container, Typography, Grid, TextField, Button, Link, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, YouTube, LinkedIn } from "@mui/icons-material";

const rootStyles = { 
  black: "#192531",
  white: "#FAFAFA",
  blue: "#00D3FF",
  green: "#00FF99",
};

function Footer() {
  return (
    <Box component="footer" sx={{ backgroundColor: rootStyles.black, color: rootStyles.white, py: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Suscripción al boletín */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Suscríbete a nuestro boletín
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Regístrese ahora para recibir las últimas novedades.
            </Typography>
            <Box component="form" display="flex" alignItems="center">
              <TextField
                variant="outlined"
                size="small"
                placeholder="Correo electrónico"
                sx={{ backgroundColor: rootStyles.white, borderRadius: 1, mr: 1, flex: 1 }}
              />
              <Button variant="contained" sx={{ backgroundColor: rootStyles.blue, color: rootStyles.black }}>
                Registrarse
              </Button>
            </Box>
          </Grid>

          {/* Secciones de navegación */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={4}>
              {[{
                title: "Ubiquitilux",
                links: ["Sobre nosotros", "Trabaja con nosotros", "Atención al cliente"]
              },
              { title: "Comprar", links: ["Quiero ser Cliente", "Política de Ventas", "Políticas de Garantías"] },
              { title: "Cursos", links: ["Registro", "Ayuda", "Preguntas Frecuentes"] },
              { title: "Soporte", links: ["Quejas y Reclamos"] }].map((section, index) => (
                <Grid item xs={6} sm={3} key={index}>
                  <Typography variant="h6" gutterBottom>
                    {section.title}
                  </Typography>
                  {section.links.map((link, i) => (
                    <Typography key={i} variant="body2">
                      <Link href="#" color="inherit" underline="none">
                        {link}
                      </Link>
                    </Typography>
                  ))}
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        {/* Redes sociales */}
        <Box mt={4} textAlign="center">
          <Typography variant="h6" gutterBottom>
            Síguenos
          </Typography>
          <Box>
            {[{
              icon: <Facebook />, link: "https://facebook.com"
            },
            { icon: <Twitter />, link: "https://twitter.com" },
            { icon: <Instagram />, link: "https://instagram.com" },
            { icon: <YouTube />, link: "https://youtube.com" },
            { icon: <LinkedIn />, link: "https://linkedin.com" }].map((social, index) => (
              <IconButton key={index} href={social.link} target="_blank" sx={{ color: rootStyles.white, mx: 0.5 }}>
                {social.icon}
              </IconButton>
            ))}
          </Box>
        </Box>

        {/* Derechos reservados */}
        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          © {new Date().getFullYear()} Ubiquitilux. Todos los derechos reservados.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
