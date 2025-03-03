import React, { useState } from "react";
import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    IconButton,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

function getRandomPicsumImages() {
    const numImages = Math.floor(Math.random() * 5) + 1; // De 1 a 5 imágenes
    return Array.from({ length: numImages }, () =>
        `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/400/400`
    );
}

const ProductCard = ({ category, name, description, price, discount, brand, colors, sizes, images, }) => {
    const parsedColors =
        typeof colors === "string" && colors.trim() !== ""
            ? colors.split(";").map((c) => c.trim())
            : Array.isArray(colors)
                ? colors
                : [];
    const parsedSizes =
        typeof sizes === "string" && sizes.trim() !== ""
            ? sizes.split(";").map((s) => s.trim())
            : Array.isArray(sizes)
                ? sizes
                : [];
    const parsedImages =
        typeof images === "string" && images.trim() !== ""
            ? [images.trim()]
            : Array.isArray(images)
                ? images
                : [];

    // Si no hay imágenes definidas, se generan imágenes aleatorias
    const productImages = parsedImages.length > 0 ? parsedImages : getRandomPicsumImages();

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [hovered, setHovered] = useState(false);

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? productImages.length - 1 : prevIndex - 1
        );
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === productImages.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <Card
            sx={{
                position: "relative",
                width: "100%", // ancho fijo
                height: 380, // alto fijo (puedes ajustar según lo necesites)
                position: "relative",
                overflow: "hidden",
                borderRadius: 1.5,
                transition: "opacity 0.3s ease-in-out",

            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Contenedor de imagen con tamaño fijo */}
            <Box sx={{
                position: "relative",
                height: "60%",
                width: "100%",
                overflow: "hidden",
                display: "block",

            }}>
                <CardMedia
                    component="img"
                    sx={{
                        position: "relative",
                        objectFit: "cover",
                        objectPosition: "center",
                        display: "block",
                        height: "100%",
                        width: "100%",
                    }}
                    image={productImages[currentImageIndex]}
                    alt={name}
                />

                {productImages.length > 1 && hovered && (
                    <Box>
                        <IconButton
                            onClick={handlePrevImage}
                            sx={{
                                position: "absolute",
                                top: "50%",
                                left: 5,
                                transform: "translateY(-50%)",
                                backgroundColor: "rgba(0,0,0,0.5)",
                                color: "green"
                            }}
                        >
                            <ArrowBackIos />
                        </IconButton>
                        <IconButton
                            onClick={handleNextImage}
                            sx={{
                                position: "absolute",
                                top: "50%",
                                right: 5,
                                transform: "translateY(-50%)",
                                backgroundColor: "rgba(0,0,0,0.5)",
                                color: "white"
                            }}
                        >
                            <ArrowForwardIos />
                        </IconButton>
                    </Box>
                )}
            </Box>

            {/* Contenido de la tarjeta */}
            <CardContent sx={{position: "relative", flexGrow: 1, overflow: "hidden" }}>

                <Typography  variant="h6" component="div"  sx={{position: "relative",fontWeight: "bold", fontSize: 14, width: "100%", overflow: "hidden", textOverflow: "ellipsis", maxHeight: 20}}>
                    {name}
                </Typography>
                {description && (
                    <Typography   color="text.secondary" sx={{position: "relative", fontSize: 12, width: "100%", overflow: "hidden", textOverflow: "ellipsis", maxHeight: 40}}>
                        {description}
                    </Typography>
                )}

                <Typography variant="body2" color="text.secondary">
                    {brand}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <Typography variant="h6" color="text.primary">
                        S/.{price}
                    </Typography>
                    {discount && (
                        <Typography variant="body2" color="error" sx={{ ml: 1 }}>
                            (-{discount}%)
                        </Typography>
                    )}
                </Box>
            </CardContent>

            {(parsedColors.length > 0 || parsedSizes.length > 0) && (
                <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
                    {parsedColors.length > 0 && (
                        <FormControl size="small" sx={{ minWidth: 120 }}>
                            <InputLabel id="color-select-label">Color</InputLabel>
                            <Select
                                labelId="color-select-label"
                                id="color-select"
                                label="Color"
                                defaultValue=""
                            >
                                {parsedColors.map((color, index) => (
                                    <MenuItem key={index} value={color}>
                                        {color}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                    {parsedSizes.length > 0 && (
                        <FormControl size="small" sx={{ minWidth: 120 }}>
                            <InputLabel id="size-select-label">Tamaño</InputLabel>
                            <Select
                                labelId="size-select-label"
                                id="size-select"
                                label="Tamaño"
                                defaultValue=""
                            >
                                {parsedSizes.map((size, index) => (
                                    <MenuItem key={index} value={size}>
                                        {size}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                </CardActions>
            )}
        </Card>
    );
};

export default ProductCard;
