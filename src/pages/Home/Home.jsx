import { Route } from "react-router";
import "./Home.css";
import Title from "../../components/Title/Title";
import Menu from "../Templates/Menu/Menu";
import Parqueo from "./subhome/Parqueo/Parqueo";
import { useState } from "react";
import PantallaIncidentesAdmin from "./subhome/Mantenimiento/PantallaIncidentesAdmin";
import AreaComun from "./subhome/AreaComun/AreaComun";
import Pagos from "./subhome/Pagos/Pagos";
import Usuarios from "./subhome/Usuarios/Administrador/Residentes/Usuarios/Usuarios";
import Dashboard from "./subhome/Dashboard/Dashboard";
import Consumo from "./subhome/Consumo/Consumo";
import Main from "./subhome/Comunicaciones/Main";

export function Home() {
    const [pageSelected,setPageSelected]=useState("")

    const renderPage=()=>{
        switch (pageSelected) {
            case "":
                return <Title p_text="Siu HOME" />
            case "dashboard":
                return <Dashboard />
            case "parqueo":
                return <Parqueo/>
            case "pagos":
                return <Pagos/>
            /* case "depas":
                return <Title p_text="depas"/> */
            case "mantenimiento":
                return <PantallaIncidentesAdmin/>
            case "areaComun":
                return <AreaComun/>
            case "chat":
                return <Main/>
            case "usuarios":
                return <Usuarios />
            case "consumo":
                return <Consumo/>
            default:
                break;
        }
    }

    return <div className="c_home-container">
        <Menu p_pageSelected={pageSelected} p_setPageSelected={setPageSelected} />
        <div className="c_home-contentContainer">
            {renderPage()}
        </div>
    </div>
}

export default Home