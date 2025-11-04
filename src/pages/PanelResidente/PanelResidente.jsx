import NavBarHeader from "../../components/nav/NavBarHeader.jsx";
import { opcionesNavegadorResidente } from "../../utils/opciones.js";
import { Route, Routes } from "react-router";


import Incidentes from "./Incidentes/Incidentes.jsx";
import Consumo from "./Consumo/Consumo.jsx";
import AreaComunRes from "./AreaComun/AreaComunRes.jsx";
import Main from "./Comunicaciones/Main.jsx";

const PanelResidente = () => {
    return (
        <div style={{textAlign:'center'}}>
            <NavBarHeader opciones={opcionesNavegadorResidente} />
            <Routes>
                <Route path="" element={<h1>Hola usuario</h1>} />
                <Route path="anuncios" element={<h1>Página de anuncios</h1>} />
                <Route path="incidentes/*" element={<Incidentes />} />
                <Route path="consumo" element={<Consumo />} />
                <Route path="area-comun/*" element={<AreaComunRes />} />
                <Route path="chat/*" element={<Main/>} />
            </Routes>
        </div>
    )
}

export default PanelResidente
