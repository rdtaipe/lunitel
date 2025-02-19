import React, { useEffect, useState } from 'react'



import Carousel from '../components/Carousel';
import ProductCard from '../components/ProductCard';
import CardContainer from '../components/CardContainer';
import { useDispatch, useSelector } from 'react-redux';
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

const products = [
  // Categoría: Informatica (25 productos)
  {
    category: "Zapatillas",
    name: "Air Max 270",
    price: 120,
    discount: 10,
    brand: "Nike",
    colors: ["Negro", "Blanco", "Rojo", "Azul"],
    sizes: [38, 39, 40, 41, 42],
    image: "https://picsum.photos/id/201/400/300",
  },
  {
    category: "Informatica",
    name: "Laptop HP Pavilion 15",
    brand: "HP",
    price: 3999,
    discount: 10,
  },
  {
    category: "Informatica",
    name: "Laptop Lenovo Ideapad 3",
    brand: "Lenovo",
    price: 3499,
    discount: null,
  },
  {
    category: "Informatica",
    name: "Laptop Dell Inspiron 15",
    brand: "Dell",
    price: 4200,
    discount: 5,
  },
  {
    category: "Informatica",
    name: "Laptop Acer Aspire 5",
    brand: "Acer",
    price: 3599,
    discount: null,
  },
  {
    category: "Informatica",
    name: "Laptop Asus VivoBook 15",
    brand: "Asus",
    price: 3799,
    discount: 15,
  },
  {
    category: "Informatica",
    name: "Laptop MSI Modern 14",
    brand: "MSI",
    price: 4499,
    discount: null,
  },
  {
    category: "Informatica",
    name: "Laptop Huawei MateBook D14",
    brand: "Huawei",
    price: 3999,
    discount: 10,
  },
  {
    category: "Informatica",
    name: "Laptop Dell XPS 13",
    brand: "Dell",
    price: 5999,
    discount: 5,
  },
  {
    category: "Informatica",
    name: "Laptop Lenovo ThinkPad E14",
    brand: "Lenovo",
    price: 4899,
    discount: null,
  },
  {
    category: "Informatica",
    name: "Laptop HP Envy x360",
    brand: "HP",
    price: 5299,
    discount: 10,
  },
  {
    category: "Informatica",
    name: "Desktop HP EliteDesk",
    brand: "HP",
    price: 3599,
    discount: null,
  },
  {
    category: "Informatica",
    name: "Desktop Dell OptiPlex",
    brand: "Dell",
    price: 3899,
    discount: 5,
  },
  {
    category: "Informatica",
    name: "All-in-One Lenovo IdeaCentre",
    brand: "Lenovo",
    price: 4499,
    discount: null,
  },
  {
    category: "Informatica",
    name: "Laptop Acer Swift 3",
    brand: "Acer",
    price: 3999,
    discount: 10,
  },
  {
    category: "Informatica",
    name: "Laptop Asus ZenBook 14",
    brand: "Asus",
    price: 4599,
    discount: null,
  },
  {
    category: "Informatica",
    name: "Laptop MSI Stealth 15",
    brand: "MSI",
    price: 5199,
    discount: 5,
  },
  {
    category: "Informatica",
    name: "Laptop Huawei MateBook X Pro",
    brand: "Huawei",
    price: 5999,
    discount: 15,
  },
  {
    category: "Informatica",
    name: "Laptop Dell G3 15",
    brand: "Dell",
    price: 3799,
    discount: null,
  },
  {
    category: "Informatica",
    name: "Laptop Lenovo Legion 5",
    brand: "Lenovo",
    price: 5499,
    discount: 10,
  },
  {
    category: "Informatica",
    name: "Laptop HP Omen 15",
    brand: "HP",
    price: 5699,
    discount: null,
  },
  {
    category: "Informatica",
    name: "Laptop Acer Nitro 5",
    brand: "Acer",
    price: 5299,
    discount: 5,
  },
  {
    category: "Informatica",
    name: "Laptop Asus ROG Strix",
    brand: "Asus",
    price: 6399,
    discount: 10,
  },
  {
    category: "Informatica",
    name: "Laptop MSI GF63 Thin",
    brand: "MSI",
    price: 4499,
    discount: null,
  },
  {
    category: "Informatica",
    name: "Laptop Dell Alienware m15",
    brand: "Dell",
    price: 6999,
    discount: 15,
  },
  {
    category: "Informatica",
    name: "Laptop Lenovo Yoga Slim 7",
    brand: "Lenovo",
    price: 4899,
    discount: null,
  },

  // Categoría: Computo (25 productos)
  {
    category: "Computo",
    name: "Monitor LG 24\" Full HD",
    brand: "LG",
    price: 899,
    discount: 10,
  },
  {
    category: "Computo",
    name: "Monitor Samsung 27\" Curvo",
    brand: "Samsung",
    price: 1299,
    discount: null,
  },
  {
    category: "Computo",
    name: "Teclado Mecánico Redragon",
    brand: "Redragon",
    price: 299,
    discount: 5,
  },
  {
    category: "Computo",
    name: "Mouse Inalámbrico Logitech M720",
    brand: "Logitech",
    price: 249,
    discount: null,
  },
  {
    category: "Computo",
    name: "Impresora Brother HL-L2350DW",
    brand: "Brother",
    price: 799,
    discount: 10,
  },
  {
    category: "Computo",
    name: "Disco SSD Kingston 240GB",
    brand: "Kingston",
    price: 349,
    discount: null,
  },
  {
    category: "Computo",
    name: "Memoria RAM Corsair 8GB DDR4",
    brand: "Corsair",
    price: 399,
    discount: 5,
  },
  {
    category: "Computo",
    name: "Teclado Inalámbrico Logitech K380",
    brand: "Logitech",
    price: 199,
    discount: null,
  },
  {
    category: "Computo",
    name: "Mouse Logitech G305",
    brand: "Logitech",
    price: 279,
    discount: 10,
  },
  {
    category: "Computo",
    name: "Monitor AOC 24\" Full HD",
    brand: "AOC",
    price: 849,
    discount: null,
  },
  {
    category: "Computo",
    name: "Impresora HP LaserJet Pro",
    brand: "HP",
    price: 899,
    discount: 5,
  },
  {
    category: "Computo",
    name: "Sistema Todo en Uno Dell Inspiron",
    brand: "Dell",
    price: 2999,
    discount: 10,
  },
  {
    category: "Computo",
    name: "Desktop HP Pavilion",
    brand: "HP",
    price: 2599,
    discount: null,
  },
  {
    category: "Computo",
    name: "Monitor Dell UltraSharp 24\"",
    brand: "Dell",
    price: 999,
    discount: 10,
  },
  {
    category: "Computo",
    name: "Router TP-Link Archer C6",
    brand: "TP-Link",
    price: 199,
    discount: null,
  },
  {
    category: "Computo",
    name: "Teclado Gamer Razer Cynosa",
    brand: "Razer",
    price: 399,
    discount: 5,
  },
  {
    category: "Computo",
    name: "Mouse Gamer Razer DeathAdder",
    brand: "Razer",
    price: 349,
    discount: null,
  },
  {
    category: "Computo",
    name: "Disco Duro Externo Seagate 2TB",
    brand: "Seagate",
    price: 449,
    discount: 10,
  },
  {
    category: "Computo",
    name: "Fuente de Poder Corsair 600W",
    brand: "Corsair",
    price: 499,
    discount: null,
  },
  {
    category: "Computo",
    name: "Placa Madre ASUS Prime B450M",
    brand: "ASUS",
    price: 699,
    discount: 5,
  },
  {
    category: "Computo",
    name: "Tarjeta Gráfica NVIDIA GeForce GTX 1660",
    brand: "NVIDIA",
    price: 1999,
    discount: 10,
  },
  {
    category: "Computo",
    name: "Ventilador de CPU Cooler Master",
    brand: "Cooler Master",
    price: 199,
    discount: null,
  },
  {
    category: "Computo",
    name: "Kit de Altavoces Logitech Z213",
    brand: "Logitech",
    price: 299,
    discount: 5,
  },
  {
    category: "Computo",
    name: "Monitor BenQ 23.8\" IPS",
    brand: "BenQ",
    price: 799,
    discount: null,
  },
  {
    category: "Computo",
    name: "Teclado Inalámbrico Microsoft",
    brand: "Microsoft",
    price: 249,
    discount: 10,
  },

  // Categoría: Tecnologia (25 productos)
  {
    category: "Tecnologia",
    name: "Smartphone Samsung Galaxy A32",
    brand: "Samsung",
    price: 1599,
    discount: 10,
  },
  {
    category: "Tecnologia",
    name: "Smartphone Xiaomi Redmi Note 10",
    brand: "Xiaomi",
    price: 1299,
    discount: null,
  },
  {
    category: "Tecnologia",
    name: "Tablet Lenovo Tab M10",
    brand: "Lenovo",
    price: 1099,
    discount: 5,
  },
  {
    category: "Tecnologia",
    name: "Smartwatch Xiaomi Mi Band 6",
    brand: "Xiaomi",
    price: 299,
    discount: null,
  },
  {
    category: "Tecnologia",
    name: "Smart TV TCL 43\"",
    brand: "TCL",
    price: 2199,
    discount: 10,
  },
  {
    category: "Tecnologia",
    name: "Auriculares Inalámbricos JBL",
    brand: "JBL",
    price: 499,
    discount: 5,
  },
  {
    category: "Tecnologia",
    name: "Tablet Samsung Galaxy Tab A7",
    brand: "Samsung",
    price: 1499,
    discount: null,
  },
  {
    category: "Tecnologia",
    name: "Smartphone Motorola Moto G30",
    brand: "Motorola",
    price: 1199,
    discount: 10,
  },
  {
    category: "Tecnologia",
    name: "Smartwatch Samsung Galaxy Watch Active2",
    brand: "Samsung",
    price: 1699,
    discount: null,
  },
  {
    category: "Tecnologia",
    name: "Auriculares Bluetooth Sony WH-CH710N",
    brand: "Sony",
    price: 799,
    discount: 15,
  },
  {
    category: "Tecnologia",
    name: "Smartphone Oppo A54",
    brand: "Oppo",
    price: 1399,
    discount: null,
  },
  {
    category: "Tecnologia",
    name: "Tablet Huawei MatePad T10",
    brand: "Huawei",
    price: 999,
    discount: 10,
  },
  {
    category: "Tecnologia",
    name: "Smart TV LG 43\"",
    brand: "LG",
    price: 2499,
    discount: 5,
  },
  {
    category: "Tecnologia",
    name: "Auriculares Inalámbricos Bose SoundLink",
    brand: "Bose",
    price: 999,
    discount: null,
  },
  {
    category: "Tecnologia",
    name: "Smartphone Realme 8",
    brand: "Realme",
    price: 1299,
    discount: 10,
  },
  {
    category: "Tecnologia",
    name: "Smartwatch Apple Watch Series 6",
    brand: "Apple",
    price: 3499,
    discount: 5,
  },
  {
    category: "Tecnologia",
    name: "Tablet iPad 10.2\"",
    brand: "Apple",
    price: 2999,
    discount: null,
  },
  {
    category: "Tecnologia",
    name: "Auriculares inalámbricos Anker Soundcore",
    brand: "Anker",
    price: 399,
    discount: 10,
  },
  {
    category: "Tecnologia",
    name: "Smartphone OnePlus Nord N10",
    brand: "OnePlus",
    price: 1699,
    discount: null,
  },
  {
    category: "Tecnologia",
    name: "Smart TV Sony Bravia 49\"",
    brand: "Sony",
    price: 2999,
    discount: 15,
  },
  {
    category: "Tecnologia",
    name: "Auriculares True Wireless Samsung Galaxy Buds",
    brand: "Samsung",
    price: 599,
    discount: 10,
  },
  {
    category: "Tecnologia",
    name: "Smartphone LG Velvet",
    brand: "LG",
    price: 1999,
    discount: null,
  },
  {
    category: "Tecnologia",
    name: "Smartwatch Fitbit Versa 3",
    brand: "Fitbit",
    price: 899,
    discount: 10,
  },
  {
    category: "Tecnologia",
    name: "Tablet Microsoft Surface Go",
    brand: "Microsoft",
    price: 2799,
    discount: 5,
  },
  {
    category: "Tecnologia",
    name: "Auriculares inalámbricos Sennheiser Momentum",
    brand: "Sennheiser",
    price: 1299,
    discount: null,
  },

  // Categoría: Accesorios de Computo (25 productos)
  {
    category: "Accesorios de Computo",
    name: "Cámara Web Logitech C920",
    brand: "Logitech",
    price: 399,
    discount: 10,
  },
  {
    category: "Accesorios de Computo",
    name: "Auriculares HyperX Cloud II",
    brand: "HyperX",
    price: 499,
    discount: null,
  },
  {
    category: "Accesorios de Computo",
    name: "Mousepad Gamer Razer",
    brand: "Razer",
    price: 149,
    discount: 5,
  },
  {
    category: "Accesorios de Computo",
    name: "Soporte para Laptop",
    brand: "Generic",
    price: 199,
    discount: null,
  },
  {
    category: "Accesorios de Computo",
    name: "Base Refrigerante para Laptops",
    brand: "Cooler Master",
    price: 249,
    discount: 10,
  },
  {
    category: "Accesorios de Computo",
    name: "Cable HDMI 2.0",
    brand: "AmazonBasics",
    price: 99,
    discount: null,
  },
  {
    category: "Accesorios de Computo",
    name: "Adaptador USB-C a HDMI",
    brand: "UGREEN",
    price: 129,
    discount: 5,
  },
  {
    category: "Accesorios de Computo",
    name: "Disco Duro Externo WD 1TB",
    brand: "Western Digital",
    price: 349,
    discount: 10,
  },
  {
    category: "Accesorios de Computo",
    name: "Memoria USB 64GB",
    brand: "SanDisk",
    price: 99,
    discount: null,
  },
  {
    category: "Accesorios de Computo",
    name: "Teclado Numérico USB",
    brand: "Logitech",
    price: 149,
    discount: 5,
  },
  {
    category: "Accesorios de Computo",
    name: "Lámpara LED para Escritorio",
    brand: "Philips",
    price: 199,
    discount: null,
  },
  {
    category: "Accesorios de Computo",
    name: "Soporte Ergonómico para Monitor",
    brand: "AmazonBasics",
    price: 249,
    discount: 10,
  },
  {
    category: "Accesorios de Computo",
    name: "Cable de Red Cat6",
    brand: "TP-Link",
    price: 79,
    discount: null,
  },
  {
    category: "Accesorios de Computo",
    name: "Tarjeta de Memoria SD 128GB",
    brand: "Kingston",
    price: 149,
    discount: 5,
  },
  {
    category: "Accesorios de Computo",
    name: "Cargador USB 3.0",
    brand: "Anker",
    price: 99,
    discount: null,
  },
  {
    category: "Accesorios de Computo",
    name: "Soporte para Monitor Doble",
    brand: "VIVO",
    price: 349,
    discount: 10,
  },
  {
    category: "Accesorios de Computo",
    name: "Hub USB 3.0",
    brand: "TP-Link",
    price: 129,
    discount: null,
  },
  {
    category: "Accesorios de Computo",
    name: "Auricular Gaming SteelSeries Arctis 7",
    brand: "SteelSeries",
    price: 799,
    discount: 15,
  },
  {
    category: "Accesorios de Computo",
    name: "Memoria USB 128GB",
    brand: "SanDisk",
    price: 199,
    discount: 10,
  },
  {
    category: "Accesorios de Computo",
    name: "Cargador Inalámbrico Qi",
    brand: "Samsung",
    price: 299,
    discount: null,
  },
  {
    category: "Accesorios de Computo",
    name: "Estabilizador APC 800VA",
    brand: "APC",
    price: 499,
    discount: 5,
  },
  {
    category: "Accesorios de Computo",
    name: "Soporte de Escritorio para Portátil",
    brand: "Rain Design",
    price: 349,
    discount: null,
  },
  {
    category: "Accesorios de Computo",
    name: "Cámara de Seguridad IP",
    brand: "Xiaomi",
    price: 399,
    discount: 10,
  },
  {
    category: "Accesorios de Computo",
    name: "Cinta Adhesiva para Cableado",
    brand: "3M",
    price: 49,
    discount: null,
  },
  {
    category: "Accesorios de Computo",
    name: "Limpiador de Pantallas",
    brand: "Belkin",
    price: 79,
    discount: 5,
  },
];


const Home = () => {
//   const images = [Image1, Image2, Image3, Image4, Image5, Image6, Image7, Image8, Image9 ];
//   //testing redux
//   const dispatch = useDispatch();
//   //global state
//   const { url, get } = useSelector(({ state }) => state.server)
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

//   useEffect(() => {
//     getData({ filter: { name: [search], ...filter }, sort: sort })

//   }, [filter,sort, search, page])



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
    <div className='bg-stone-100'> 
      <Carousel />
      <CardContainer CardComponent={ProductCard} data={products} />

{/* 
      <Carousel images={images} />
      <Drawer
        sidebar={<Sidebar setFilter={(e) => { setFilter(e) }} />}
        navbar={<SortBar setSort={(e) => { setSort(e) }} />}
      >
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
    </div>
  );
};



export default Home;
