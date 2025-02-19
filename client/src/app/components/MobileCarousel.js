import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const MobileCarousel = ({ data }) => {
    return (
        <Box sx={{ width: "100%", height: 200 }}>
            <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000 }}
                spaceBetween={10}
                slidesPerView={1}
                loop
            >
                {data.map((item, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={item.mobile_image}
                            alt={item.header}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    );
};

export default MobileCarousel;
