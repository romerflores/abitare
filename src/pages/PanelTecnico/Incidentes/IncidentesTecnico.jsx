import { Route, Routes } from "react-router"
import IncidentesPersonal from "./TablaIncidentes/IncidentesPersonal";
import PantallaIncidente from "./PantallaIncidente/PantallaIncidente";

const IncidentesTecnico = () => {
    return (
        <div>
            <Routes>
                <Route path="" element={<IncidentesPersonal/>} />
                <Route path="reporte-info/*" element={<PantallaIncidente/>} />
            </Routes>
        </div>
    )
}

export default IncidentesTecnico