import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

import esLocale from "@fullcalendar/core/locales/es"; // 👈 Importante

export default function Calendar() {
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        const obtenerReservas = async () => {
            const res = await fetch(`https://abitare-back-production.up.railway.app/api/area-comun/residente/reservas/all`,
                {
                    method: "GET",
                    credentials: "include",
                }

            );
            const data = await res.json();
            // console.log(data)

            // Convertir reservas a eventos del calendario
            const ev = data.datos.map(r => {
                // Si r.fecha es algo como "2025-12-14T04:00:00.000Z"
                const fecha = r.fecha.split("T")[0]; // -> "2025-12-14"
                return {
                    title: `${r.nombre_area} Ocupada`,
                    start: `${fecha}T${r.hora_inicio}`,
                    end: `${fecha}T${r.hora_fin}`,
                    backgroundColor: "#4CAF50",
                    borderColor: "#388E3C",
                };
            });
            // console.log(ev)
            setEventos(ev);
        };
        obtenerReservas();
    }, []);

    return (
        <div style={{width:"80%",height:"500px",margin:"10px"}}>

            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin]}
                firstDay={1}
                locale={esLocale}
                initialView="timeGridWeek"
                events={eventos}
                allDaySlot={false}
                slotMinTime="06:00:00"
                slotMaxTime="23:00:00"
                height={"100%"}
                // width="1000px"
            />
        </div>
    );
}
