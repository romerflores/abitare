import { Route, Routes } from "react-router"
import TicketPage from "./TicketPage/TicketPage"
import Tickets from "./Tickets/Tickets"
import RegistroIncidente from "../Registroindicente/RegistroIncidente"

const Incidentes = () => {
    return (
        <div>
            <Routes>
                <Route path="" element={<Tickets />} />
                <Route path="reporte" element={<RegistroIncidente />} />
                <Route path="reporte-info/*" element={<TicketPage />} />
            </Routes>
        </div>
    )
}

export default Incidentes
