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

const ProductCard = ({
    category,
    name,
    price,
    discount,
    brand,
    colors,
    sizes,
    images,
}) => {
    const productImages = images && images.length > 0 ? images : getRandomPicsumImages();
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
        <Card sx={{ maxWidth: 230, m: "auto", position: "relative" }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}>
            <Box sx={{ position: "relative" }}>
                <CardMedia
                    component="img"
                    sx={{ objectFit: "contain", m: "auto", display: "block", height: 230, width: 230 }}
                    image={productImages[currentImageIndex]}
                    alt={name}

                />

                {productImages.length > 1 && (
                    hovered && (<Box >
                        <IconButton
                            onClick={handlePrevImage}
                            sx={{
                                position: "absolute",
                                top: "50%",
                                left: 5,
                                transform: "translateY(-50%)",
                                backgroundColor: "rgba(0,0,0,0.5)",
                                color: "white",
                                "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
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
                                color: "white",
                                "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
                            }}
                        >
                            <ArrowForwardIos />
                        </IconButton>
                    </Box>)

                )}
            </Box>

            <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    {category}
                </Typography>
                <Typography variant="h5" component="div">
                    {name}
                </Typography>
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

            {(colors?.length > 0 || sizes?.length > 0) && (
                <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
                    {colors?.length > 0 && (
                        <FormControl size="small" sx={{ minWidth: 120 }}>
                            <InputLabel id="color-select-label">Color</InputLabel>
                            <Select
                                labelId="color-select-label"
                                id="color-select"
                                label="Color"
                                defaultValue=""
                            >
                                {colors.map((color, index) => (
                                    <MenuItem key={index} value={color}>
                                        {color}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                    {sizes?.length > 0 && (
                        <FormControl size="small" sx={{ minWidth: 120 }}>
                            <InputLabel id="size-select-label">Tamaño</InputLabel>
                            <Select
                                labelId="size-select-label"
                                id="size-select"
                                label="Tamaño"
                                defaultValue=""
                            >
                                {sizes.map((size, index) => (
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
