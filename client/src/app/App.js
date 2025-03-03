import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes, useHref, useNavigate } from "react-router-dom";
import { Box, Container, Typography } from '@mui/material';


// components

import CategoriesBar from "./components/Categories.js";
import ProductCard from './components/ProductCard';
import CardContainer from './components/CardContainer';


// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'


import Footer from "./components/Footer";
import ScrollAnimate from "./components/ScrollAnimate.js";
import NavBar from "./components/NavBar";



import Home from "./pages/Home.js";
import ContactBar from "./components/ContactBar.js";
import Breadcrumb from "./components/Breadcrumb.js";
import SortBar from "./components/SortBar.js";
// import Error from "./pages/ErrorComponent/Error";
const products = {
  categories: [
    {
      category: "Pupulares",
      countCategory: "11"
    },
    {
      category: "Computo",
      countCategory: "9"
    },
    {
      category: "Redes",
      countCategory: "10"
    },
    {
      category: "Electronica",
      countCategory: "10"
    },
    {
      category: "Celulares",
      countCategory: "9"
    },
    {
      category: "Multimedia",
      countCategory: "9"
    },
    {
      category: "Seguridad",
      countCategory: "12"
    },
    {
      category: "Gamer",
      countCategory: "9"
    },
    {
      category: "Gadgets",
      countCategory: "9"
    }
  ],
  products: [
    {
      id: "1",
      name: "Notebook Lenovo V15 G2 Ijl, 15.6\" Fhd Tn, Celeron N4500 1.1 / 2.8Ghz, 8Gb Ddr4-2933Mhz",
      description: "Notebook Lenovo V15 G2 IJL, 15.6\" FHD TN, Celeron N4500 1.1 / 2.8GHz, 8GB DDR4-2933MHz 256GB SSD M.2 2242 PCIe 3.0x4 NVMe, Video Integrado Intel UHD Graphics, Audio HD / Realtek ALC3287 Codec Stereo Speakers 1.5W x2 / Dolby Audio, LAN GbE (RJ-45), WLAN Wi-Fi 5 802.11ac 2x2 Bluetooth 5.1, Cámara Web HD 720p con Obturador de privacidad Microfono 2x Array, Teclado no retroiluminado en español (LA), Bateria integrada 38Wh, Adaptador de corriente 45W Round Tip (3-pin), Color Black (Negro).No incluye Sistema Operativo.",
      price: "1002",
      discount: "25",
      images: [
        "https://www.loginstore.com/img/datasheet/NBLEN82QY00QALM_LARGE.webp",
        "https://www.loginstore.com/img/datasheet/NBHPA12FJLAABM.webp"
      ],
      brand: "TP-Link",
      colors: "Negro (#000000)",
      sizes: null,
      category: "Pupulares",
      subcategories: "Ofertas, Laptops",
      tags: "5G, Almacenamiento",
      sellCount: "1"
    },
    {
      id: "2",
      name: "Laptop HP Pavilion 15",
      description: null,
      price: "3999",
      discount: "10",
      images: "https://picsum.photos/id/21/400/300",
      brand: "Cisco",
      colors: "Azul (#0000FF)",
      sizes: null,
      category: "Pupulares",
      subcategories: null,
      tags: "WiFi 6",
      sellCount: "0"
    },
    {
      id: "11",
      name: "Laptop Dell XPS 13",
      description: null,
      price: "5999",
      discount: "5",
      images: "https://picsum.photos/id/201/400/308",
      brand: "TP-Link",
      colors: null,
      sizes: null,
      category: "Pupulares",
      subcategories: "Almacenamiento Externo",
      tags: "WiFi 6",
      sellCount: null
    },
    {
      id: "13",
      name: "Laptop HP Pavilion 15",
      description: null,
      price: "3999",
      discount: "10",
      images: "https://picsum.photos/id/21/400/300",
      brand: "Nvidia",
      colors: null,
      sizes: null,
      category: "Computo",
      subcategories: null,
      tags: "WiFi 6",
      sellCount: "45"
    },
    {
      id: "14",
      name: "Laptop Lenovo Ideapad 3",
      description: null,
      price: "3499",
      discount: null,
      images: "https://picsum.photos/id/21/400/301",
      brand: "Lenovo",
      colors: null,
      sizes: null,
      category: "Computo",
      subcategories: null,
      tags: null,
      sellCount: "11"
    },
    {
      id: "15",
      name: "Laptop Dell Inspiron 15",
      description: null,
      price: "4200",
      discount: "5",
      images: "https://picsum.photos/id/21/400/302",
      brand: "Lenovo",
      colors: null,
      sizes: null,
      category: "Computo",
      subcategories: null,
      tags: null,
      sellCount: "55"
    },
    {
      id: "16",
      name: "Laptop Acer Aspire 5",
      description: null,
      price: "3599",
      discount: null,
      images: "https://picsum.photos/id/21/400/303",
      brand: "Lenovo",
      colors: null,
      sizes: null,
      category: "Computo",
      subcategories: null,
      tags: null,
      sellCount: "34"
    },
    {
      id: "17",
      name: "Laptop Asus VivoBook 15",
      description: null,
      price: "3799",
      discount: "15",
      images: "https://picsum.photos/id/21/400/304",
      brand: "Lenovo",
      colors: null,
      sizes: null,
      category: "Computo",
      subcategories: null,
      tags: null,
      sellCount: "343"
    },
    {
      id: "18",
      name: "Laptop MSI Modern 14",
      description: null,
      price: "4499",
      discount: null,
      images: "https://picsum.photos/id/21/400/305",
      brand: "Lenovo",
      colors: null,
      sizes: null,
      category: "Computo",
      subcategories: null,
      tags: null,
      sellCount: "34"
    },
    {
      id: "19",
      name: "Laptop Huawei MateBook D14",
      description: null,
      price: "3999",
      discount: "10",
      images: "https://picsum.photos/id/201/400/307",
      brand: "Lenovo",
      colors: null,
      sizes: null,
      category: "Computo",
      subcategories: null,
      tags: null,
      sellCount: "12"
    },
    {
      id: "22",
      name: "Laptop HP Pavilion 15",
      description: null,
      price: "3999",
      discount: "10",
      images: "https://picsum.photos/id/21/400/300",
      brand: "Nvidia",
      colors: null,
      sizes: null,
      category: "Redes",
      subcategories: null,
      tags: "WiFi 6",
      sellCount: "12"
    },
    {
      id: "23",
      name: "Laptop Lenovo Ideapad 3",
      description: null,
      price: "3499",
      discount: null,
      images: "https://picsum.photos/id/21/400/301",
      brand: "Lenovo",
      colors: null,
      sizes: null,
      category: "Redes",
      subcategories: null,
      tags: null,
      sellCount: "11"
    },
    {
      id: "24",
      name: "Laptop Dell Inspiron 15",
      description: null,
      price: "4200",
      discount: "5",
      images: "https://picsum.photos/id/21/400/302",
      brand: "Lenovo",
      colors: null,
      sizes: null,
      category: "Redes",
      subcategories: null,
      tags: null,
      sellCount: "2"
    },
    {
      id: "25",
      name: "Laptop Acer Aspire 5",
      description: null,
      price: "3599",
      discount: null,
      images: "https://picsum.photos/id/21/400/303",
      brand: "Lenovo",
      colors: null,
      sizes: null,
      category: "Redes",
      subcategories: null,
      tags: null,
      sellCount: "1"
    },
    {
      id: "26",
      name: "Laptop Asus VivoBook 15",
      description: null,
      price: "3799",
      discount: "15",
      images: "https://picsum.photos/id/21/400/304",
      brand: "Lenovo",
      colors: null,
      sizes: null,
      category: "Redes",
      subcategories: null,
      tags: null,
      sellCount: "4"
    },
    {
      id: "27",
      name: "Laptop MSI Modern 14",
      description: null,
      price: "4499",
      discount: null,
      images: "https://picsum.photos/id/21/400/305",
      brand: "Lenovo",
      colors: null,
      sizes: null,
      category: "Redes",
      subcategories: null,
      tags: null,
      sellCount: "3"
    },
    {
      id: "28",
      name: "Laptop Huawei MateBook D14",
      description: null,
      price: "3999",
      discount: "10",
      images: "https://picsum.photos/id/201/400/307",
      brand: "Lenovo",
      colors: null,
      sizes: null,
      category: "Redes",
      subcategories: null,
      tags: null,
      sellCount: "0"
    },
    {
      id: "29",
      name: "Laptop Dell XPS 13",
      description: null,
      price: "5999",
      discount: "5",
      images: "https://picsum.photos/id/201/400/308",
      brand: "Cisco",
      colors: null,
      sizes: null,
      category: "Redes",
      subcategories: null,
      tags: null,
      sellCount: "12"
    },
    {
      id: "63",
      name: "Laptop Acer Aspire 5",
      description: null,
      price: "3599",
      discount: null,
      images: "https://picsum.photos/id/21/400/303",
      brand: "Lenovo",
      colors: null,
      sizes: null,
      category: "Seguridad",
      subcategories: null,
      tags: null,
      sellCount: "34"
    },
    {
      id: "64",
      name: "Laptop Asus VivoBook 15",
      description: null,
      price: "3799",
      discount: "15",
      images: "https://picsum.photos/id/21/400/304",
      brand: "Lenovo",
      colors: null,
      sizes: null,
      category: "Seguridad",
      subcategories: null,
      tags: null,
      sellCount: "343"
    },
    {
      id: "69",
      name: "Laptop Dell XPS 13",
      description: null,
      price: "5999",
      discount: "5",
      images: "https://picsum.photos/id/201/400/308",
      brand: "Cisco",
      colors: null,
      sizes: null,
      category: "Seguridad",
      subcategories: null,
      tags: null,
      sellCount: null
    },
    {
      id: "70",
      name: "Laptop Dell XPS 13",
      description: null,
      price: "5999",
      discount: "5",
      images: "https://picsum.photos/id/201/400/308",
      brand: "Cisco",
      colors: null,
      sizes: null,
      category: "Seguridad",
      subcategories: null,
      tags: null,
      sellCount: null
    }
  ],
  brands: [
    {
      name: "TP-Link",
      image: "https://upload.wikimedia.org/wikipedia/commons/d/d0/TPLINK_Logo_2.svg",
      description: "Fabricante de productos de redes y telecomunicaciones."
    },
    {
      name: "Cisco",
      image: "https://upload.wikimedia.org/wikipedia/commons/6/64/Cisco_logo.svg",
      description: "Líder en soluciones de redes y comunicaciones empresariales."
    },
    {
      name: "Samsung",
      image: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
      description: "Empresa multinacional de tecnología y electrónica de consumo."
    },
    {
      name: "D-Link",
      image: "https://upload.wikimedia.org/wikipedia/commons/4/45/D-Link_wordmark.svg",
      description: "Proveedor de soluciones de redes para hogares y empresas."
    },
    {
      name: "Ubiquiti",
      image: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Ubiquiti_Networks.svg",
      description: "Especialista en soluciones de redes inalámbricas y empresariales."
    },
    {
      name: "Asus",
      image: "https://upload.wikimedia.org/wikipedia/commons/2/2e/ASUS_Logo.svg",
      description: "Fabricante de hardware, laptops y componentes de PC."
    },
    {
      name: "Lenovo",
      image: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Lenovo_%282015%29.svg",
      description: "Multinacional china especializada en computadoras y tecnología."
    },
    {
      name: "Sony",
      image: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg",
      description: "Conglomerado japonés líder en electrónica, entretenimiento y videojuegos."
    },
    {
      name: "Xiaomi",
      image: "https://upload.wikimedia.org/wikipedia/commons/2/29/Xiaomi_logo.svg",
      description: "Fabricante de teléfonos, dispositivos inteligentes y electrónica de consumo."
    },
    {
      name: "Hp",
      image: "https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg",
      description: "Compañía de hardware y software enfocada en PCs e impresión."
    },
    {
      name: "Nvidia",
      image: "https://upload.wikimedia.org/wikipedia/commons/a/a4/NVIDIA_logo.svg",
      description: "Líder en tarjetas gráficas, inteligencia artificial y computación avanzada."
    },
    {
      name: "AMD",
      image: "https://upload.wikimedia.org/wikipedia/commons/7/7c/AMD_Logo.svg",
      description: "Empresa especializada en procesadores y tarjetas gráficas."
    }
  ],
  frontImages: [
    {
      header: "green",
      text: null,
      mobile_image: "https://http2.mlstatic.com/D_NQ_779398-MLA82086747340_022025-F.webp",
      desktop_image: "https://http2.mlstatic.com/D_NQ_744243-MLA82480553657_022025-OO.webp",
      url: null
    },
    {
      header: "fitnes",
      text: null,
      mobile_image: "https://http2.mlstatic.com/D_NQ_922481-MLA82294592933_022025-F.webp",
      desktop_image: "https://http2.mlstatic.com/D_NQ_879631-MLA82012791460_022025-OO.webp",
      url: null
    },
    {
      header: "jbl",
      text: null,
      mobile_image: "https://http2.mlstatic.com/D_NQ_904277-MLA82478511181_022025-F.webp",
      desktop_image: "https://http2.mlstatic.com/D_NQ_915870-MLA82478501395_022025-OO.webp",
      url: null
    },
    {
      header: "samsung",
      text: null,
      mobile_image: "https://http2.mlstatic.com/D_NQ_702022-MLA81826745098_012025-F.webp",
      desktop_image: "https://http2.mlstatic.com/D_NQ_938919-MLA81826707370_012025-OO.webp",
      url: null
    },
    {
      header: "san balentin",
      text: null,
      mobile_image: "https://http2.mlstatic.com/D_NQ_614822-MLA82294205277_022025-F.webp",
      desktop_image: "https://http2.mlstatic.com/D_NQ_847590-MLA82294063415_022025-OO.webp",
      url: null
    },
    {
      header: "hogara y muebles",
      text: null,
      mobile_image: "https://http2.mlstatic.com/D_NQ_779398-MLA82086747340_022025-F.webp",
      desktop_image: "https://http2.mlstatic.com/D_NQ_689804-MLA82086690902_022025-OO.webp",
      url: null
    },
    {
      header: "accesorio de vehiculos",
      text: null,
      mobile_image: "https://http2.mlstatic.com/D_NQ_799357-MLA82013197422_022025-F.webp",
      desktop_image: "https://http2.mlstatic.com/D_NQ_868948-MLA82295039961_022025-OO.webp",
      url: null
    }
  ],
  lastFetch: {
    app: 1740953881667
  }
}
const data1 = [
  {
    users: [
      { id: 1, name: 'John', age: 25 },
      { id: 2, name: 'Jane', age: 30 },
      { id: 3, name: 'Bob', age: 35 },
    ],
  }, {
    products: products,
  }, {
    categories: {
      phones: ['Apple', 'Samsung'],
      laptops: ['Dell', 'HP'],
      tablets: ['Samsung', 'Apple']
    }
  }
]


export default function App() {
  const action = useSelector((state) => state.actions);
  const [userStatus, setUserStatus] = useState()
  const [categoriesData, setCategoriesData] = useState([]);

  const dispatch = useDispatch();
  const { get } = useSelector((state) => state.endpoint)

  const categories = action.get("data.categories")
  const sort = action.get("sort")
  const data = useSelector((state) => state.data);
  // suport array and object




  const [page, setPage] = useState("/")


  const toCategory = (str) => action.get("router").util.toCategory(str)



  const params = (str) => {
    return {
      filter: {
        category: str,
      },
    };

  }
  // console.log(request('price'))

  return (
    <div>
      <ContactBar />
      <NavBar />
      {/* <Breadcrumb /> */}
      {/* <CategoriesBar data={categoriesData} /> */}
      <SortBar />
      <Routes>
        <Route path="/" element={<Home />} />

        {categories.map((item, i) => (
          <Route key={i} path={toCategory(item.category)} element={
            <Container maxWidth="xl">
              <CardContainer CardComponent={ProductCard} data={sort.request(data.products, params(item.category)).data} />
            </Container>
          } />
        ))
        }

        {/* <Route path="/home" element={<Home />} /> */}
        {/* <Route path="/token/:token" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment/:res" element={<Payment />} />
        <Route path="/products/:productId" element={<Detail />} />
        <Route path="/authorize" element={<Authorize />} />
        <Route path="/user" element={<User />} />
        <Route path="/questions" element={<Questions />} /> */}
        {/* <Route path="/error" element={<Error/>}/> */}
      </Routes>

      <Footer />
    </div>
  );
}

