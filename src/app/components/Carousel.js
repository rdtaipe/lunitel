import { useState, useEffect, useRef } from "react";
import { Box, colors, IconButton, Stack } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const images = [
    "https://picsum.photos/id/201/1600/400",
    "https://picsum.photos/id/202/1600/400",
    "https://picsum.photos/id/203/1600/400",
    "https://picsum.photos/id/204/1600/400",
    "https://picsum.photos/id/239/1600/400",
    "https://picsum.photos/id/206/1600/400",
];
const rootStyles = {
    black: "#192531",
    white: "#FAFAFA",
    blue: "#00D3FF",
    green: "#00FF99",
};

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const intervalRef = useRef(null);

    // Función para iniciar el autoplay
    const startAutoPlay = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);
    };

    // Efecto para iniciar el autoplay
    useEffect(() => {
        startAutoPlay();
        return () => clearInterval(intervalRef.current);
    }, []);

    // Función unificada para cambiar la imagen y reiniciar el autoplay
    const updateIndex = (newIndex) => {
        setCurrentIndex(newIndex);
        startAutoPlay();
    };

    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                height: 200,
                overflow: "hidden",
                backgroundColor: rootStyles.black,
            }}
        >
            <img
                src={images[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "opacity 0.5s ease-in-out",
                }}
            />

            {/* Botón Anterior */}
            <IconButton
                onClick={() => updateIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1)}
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: 10,
                    transform: "translateY(-50%)",
                    backgroundColor: rootStyles.black,
                    color: rootStyles.blue,
                    "&:hover": { backgroundColor: rootStyles.black, color: rootStyles.green },
                }}
            >
                <ArrowBack />
            </IconButton>

            {/* Botón Siguiente */}
            <IconButton
                onClick={() => updateIndex((currentIndex + 1) % images.length)}
                sx={{
                    position: "absolute",
                    top: "50%",
                    right: 10,
                    transform: "translateY(-50%)",
                    backgroundColor: rootStyles.black,
                    color: rootStyles.blue,
                    "&:hover": { backgroundColor: rootStyles.black, color: rootStyles.green },
                }}
            >
                <ArrowForward />
            </IconButton>

            {/* Indicadores de paginación */}
            <Stack
                direction="row"
                spacing={1}
                sx={{
                    position: "absolute",
                    bottom: 20,
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 2,
                }}
            >
                {images.map((_, index) => (
                    <Box
                        key={index}
                        onClick={() => updateIndex(index)}
                        sx={{
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            backgroundColor: currentIndex === index ? rootStyles.blue : rootStyles.black,
                            opacity: currentIndex === index ? 1 : 0.8,
                            cursor: "pointer",
                            transition: "opacity 0.3s",
                        }}
                    />
                ))}
            </Stack>
        </Box>
    );
};

export default Carousel;
