import React from "react";
import "./BotonCerrarSesion.css"


const BotonCerrarSesion = ({texto, onClick}) =>{
    return(
        <button className="boton_cerrar_sesion" onClick={onClick}>
            {texto}
        </button>
    );
}

export default BotonCerrarSesion;