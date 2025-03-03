import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import DesktopCarousel from '../components/DesktopCarousel';
import MobileCarousel from '../components/MobileCarousel';
import ProductCard from '../components/ProductCard';
import CardContainer from '../components/CardContainer';
import Marquesina from '../components/Marquesina';
import SortBar from '../components/SortBar';
import TrendProductsCarousel from '../components/TrendProductsCarousel';
import Footer from '../components/Footer';
import { Box, Container, Typography } from '@mui/material';
import { Category } from '@mui/icons-material';
// import Card from '../components/Card'
// import { useDispatch, useSelector } from 'react-redux'
// import Sidebar from '../components/Sidebar/Sidebar'
// import Grid from '../components/Grid'
// import Pagination from '../components/Pagination'
// import SortBar from '../components/SortBar'
// import Carousel from '../components/Carousel'
// import Drawer from '../components/Drawer'

// import Image1 from '../assets/imagesCarousel/Image1.png'
// import Image2 from '../assets/imagesCarousel/Image2.png'
// import Image3 from '../assets/imagesCarousel/Image3.png'
// import Image4 from '../assets/imagesCarousel/Image4.png'
// import Image5 from '../assets/imagesCarousel/Image5.png'
// import Image6 from '../assets/imagesCarousel/Image6.png'
// import Image7 from '../assets/imagesCarousel/Image7.png'
// import Image8 from '../assets/imagesCarousel/Image8.png'
// import Image9 from '../assets/imagesCarousel/Image9.png'

// import Typography from "@mui/material/Typography";
// import { IconButton, MenuItem } from "@mui/material";
// import NorthRoundedIcon from "@mui/icons-material/NorthRounded";
// import SouthRoundedIcon from "@mui/icons-material/SouthRounded";




const Home = () => {
  const action = useSelector((state) => state.actions);

  const deviceType = action.get("style.settings.device")



  //   const { setter } = useSelector(({ state }) => state)
  //   const products = useSelector(state => state.products)
  //   const { top, width } = useSelector(({ state }) => state.sidebar)
  //   const { queryString } = useSelector(({ state }) => state.utils)
  //   const search = useSelector(state => state.searchName)

  //   //local state


  //   const [data, setData] = useState([]);
  //   const [page, setPage] = useState(1);
  //   const [limit, setLimit] = useState(10);
  //   const [count, setCount] = useState(0);
  //   const [filter, setFilter] = useState({});
  //   const [sort, setSort] = useState({});
  const data = useSelector((state) => state.data);


  //   const getData = ({filter,sort}) => {

  //     const obj = {
  //       m: "product",
  //       filter: filter,
  //       options: "i",
  //       // regex:"all",
  //       sort: sort,
  //       limit: 10,
  //       skip: limit * page - 10,
  //     };


  const request = {
    filter: {
      price: { $gte: 100, $lte: 500 },
      category: 'electronics',
      name: { $regex: 'phone', $options: 'i' }
    },
    sort: {
      price: 'desc',
      rating: 'asc'
    },
    groupBy: 'brand',
    limit: 20,
    skip: 0
  };

  //     const query = queryString(obj);

  //     get(url + `/find?${query}`).then((res) => {
  //       var resData = res.data.product;
  //       var documents = res.data.documents;
  //       dispatch(setter({ keys: "products", value: resData }));
  //       setData(resData);

  //       let n = Math.ceil(documents / limit)
  //       setCount((page === 1 && resData.length < limit) ? 1 : n)
  //       if (page > 1 && resData.length === 0) {
  //         setPage(1);
  //       }
  //     });
  //   };
  return (
    <Box >
      {data.frontImages.length > 0 &&
        (deviceType === "desktop" ? <DesktopCarousel data={data.frontImages} /> : <MobileCarousel data={data.frontImages} />)
      }
      <Container maxWidth="xl">
        {/* <Typography variant="h4" sx={{ my: 4 }}>Lo último. Echa un vistazo a las novedades, ahora mismo.</Typography> */}


        {/* <TrendProductsCarousel /> */}
        <CardContainer CardComponent={ProductCard} data={data.products} />
        <Marquesina data={data.brands} />



        {/* 
      <Carousel images={images} />
      <Drawer
        sidebar={<Sidebar setFilter={(e) => { setFilter(e) }} />}
        navbar={<SortBar setSort={(e) => { setSort(e) }} />}
      > setBrandsData(getSheetData)
        <div className='px-4 py-8 relative w-fit mx-auto sm:mx-0 sm:w-auto'>
          <Grid childHeight={260} childWidth={200}>
            {products.map((item, index) => {
              if(item.active){
                return <Card key={index} data={item} />
              }
            })}
          </Grid>
          <Pagination page={page} count={count} setPage={n => { setPage(n) }} />
        </div>
      </Drawer> */}
      </Container>
    </Box>
  );
};



export default Home;
