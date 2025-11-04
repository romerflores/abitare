import './PanelAdmin.css';

import { useState } from 'react'

import Navbar from '../../../../components/Navbar/Navbar'
/* import AreaComun from '../../Home/subhome/AreaComun/AreaComun'; *//* 
import Parqueo from '../../Home/subhome/Parqueo/Parqueo'; */
import Usuarios from '../Residentes/Usuarios/Usuarios';
import PantallaIncidentesAdmin from '../../PantallaIncidentesAdmin';

const PanelAdmin = () => {
  const [pageSelected, setPageSelected] = useState("")

  const renderPage = () => {
    switch (pageSelected) {
      case "Usuario":
        return <Usuarios />
      case "Areas comunes":
        return <AreaComun />
      case "Estacionamiento":
        return <Parqueo />
      case "Incidente":
        return <PantallaIncidentesAdmin/>
      /*case "areaComun":
        return <AreaComun />
      case "usuario":
        return <Usuario />
      case "pagos":
        return <Title p_text="pagos" />
      case "depas":
        return <Title p_text="depas" /> */
      default:
        break;
    }
  }

  return (
    <div className="home-admin-container">
      <Navbar setPage={setPageSelected} />
      <div className="home-admin-screen">
        {renderPage()}
      </div>
    </div>
  )
}

export default PanelAdmin
