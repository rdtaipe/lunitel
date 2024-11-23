import React from "react";
import { Helmet } from "react-helmet-async";
import logo192 from './logo192.png';
import logo from './logo.png'
import './index.css';


export const BasicHead = () => {
    const baseURL = process.env.REACT_APP_BASE_URL || "";

  return (
    <div>
      <Helmet>
        {/* Cambiar el título */}
        <title>ChicCloset Clothing</title>


        {/* Cambiar el icono de la pestaña */}
        <link rel="icon" href={logo}/>

        {/* Definir el color del tema */}
        <meta name="theme-color" content="#000000" />

        {/* Agregar una descripción */}
        <meta name="description" content="Web site created using create-react-app" />

        {/* Apple touch icon */}
        <link rel="apple-touch-icon" href={logo192} />

      </Helmet>
    </div>
  );
};

