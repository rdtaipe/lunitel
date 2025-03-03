import React from "react";
import Slider from "react-slick";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const products = [
    {
        title: "iPhone 16e",
        subtitle: "Apple Intelligence",
        price: "$599 or $24.95/mo. for 24 mo.",
        image: "https://picsum.photos/id/10/400/300",
    },
    {
        title: "iPhone 16 Pro",
        subtitle: "Apple Intelligence",
        price: "$999 or $41.62/mo. for 24 mo.",
        image: "https://picsum.photos/id/20/400/300",
    },
    {
        title: "Apple Watch Series 10",
        subtitle: "Thinstant classic.",
        price: "$399 or $33.25/mo. for 12 mo.",
        image: "https://picsum.photos/id/30/400/300",
    },
    {
        title: "MacBook Pro",
        subtitle: "Apple Intelligence",
        price: "$1599 or $133.25/mo. for 12 mo.",
        image: "https://picsum.photos/id/50/400/300",
    },
];

const NextArrow = ({ onClick }) => (
    <Button onClick={onClick} sx={{ position: "absolute", right: 0, zIndex: 2 }}>
        <ArrowForwardIos />
    </Button>
);

const PrevArrow = ({ onClick }) => (
    <Button onClick={onClick} sx={{ position: "absolute", left: 0, zIndex: 2 }}>
        <ArrowBackIos />
    </Button>
);

const TrendProductsCarousel = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    return (
        <Slider {...settings}>
            {products.map((product, index) => (
                <Card key={index} sx={{ padding: 2, margin: 1 }}>
                    <img src={product.image} alt={product.title} style={{ width: "100%" }} />
                    <CardContent>
                        <Typography variant="h6" fontWeight="bold">
                            {product.title}
                        </Typography>
                        <Typography variant="subtitle1">{product.subtitle}</Typography>
                        <Typography variant="body2">{product.price}</Typography>
                    </CardContent>
                </Card>
            ))}
        </Slider>
    );
};

export default TrendProductsCarousel;
