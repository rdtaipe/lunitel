import React from "react";
import { Helmet } from "react-helmet-async";
import appleTouchIcon from '../assets/apple-touch-icon.png';
import icon from '../assets/icon.png'
import '../assets/index.css';


export const Head = () => {

  return (
    <div>
      <Helmet>
        {/* Cambiar el título */}
        <title>Ubiquitilux</title>


        {/* Cambiar el icono de la pestaña */}
        <link rel="icon" href={icon}/>

        {/* Definir el color del tema */}
        <meta name="theme-color" content="#000000" />

        {/* Agregar una descripción */}
        <meta name="description" content="Web site created using create-react-app" />

        {/* Apple touch icon */}
        <link rel="apple-touch-icon" href={appleTouchIcon} />

      </Helmet>
    </div>
  );
};

