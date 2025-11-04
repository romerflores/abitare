import React from 'react'
import { Routes, Route } from 'react-router'
import IncidenteInfoAdmin from './Incidentes/IncidenteInfoAdmin'
/* import PanelAdmin from './Administrador/Panel/PanelAdmin' */
import PantallaIncidentes from './PantallaIncidentes'

const PantallaIncidentesAdmin = () => {
  return (
    <>
      <Routes>
        <Route path='' element={<PantallaIncidentes />} />
        <Route path='incidentes/*' element={<IncidenteInfoAdmin />} />
      </Routes>
    </>
  )
}

export default PantallaIncidentesAdmin
