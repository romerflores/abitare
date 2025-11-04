import CardContent from "../../../components/CardContent/CardContent";
import Button from "../../../components/Button/Button";

import Reservar from "./Reservar";
import MisReservas from "./MisReservas";
import { useState } from "react";
import Calendar from "../../../components/Calendar/Calendar";

export default function AreaComunRes() {
    const [option, setOption] = useState("misReservas")
    

    return <CardContent p_descripcion="Realiza tus reservas facilmente" p_titulo="Areas Comunes">



        <Calendar/>

        <div>
            <Button p_texto="Mis Reservas" p_class={option == "misReservas" ? "okay" : "warning"} p_onClick={() => { setOption("misReservas") }} />
            <Button p_texto="Areas Comunes" p_class={option == "areasComunes" ? "okay" : "warning"} p_onClick={() => { setOption("areasComunes") }} />
        </div>

        {
            option == "misReservas" && <MisReservas/>
        }
        {
            option == "areasComunes" && <Reservar/>
        }

    </CardContent>
}