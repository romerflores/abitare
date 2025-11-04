import { useEffect, useState } from "react";
import Title from "../../../components/Title/Title";
import CardImg from "../../../components/CardImg/CardImg";
import { imgRoutes } from "../../../utils/assetRoutes";
import CardModal from "../../../components/CardModal/CardModal";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import ColorText from "../../../components/ColorText/ColorText";
import PagarQR from "./PagarQR";


export default function MisReservas() {

    const [reservas, setReservas] = useState({ message: "", datos: [] })



    useEffect(() => {
        const obtenerReservas = async () => {
            try {
                const id_usuario = localStorage.getItem("id"); // o de donde lo obtengas
                const url = `https://lc82mg08-10000.brs.devtunnels.ms/api/area-comun/residente/reservas/:${id_usuario}`;
                // console.log(url)
                const response = await fetch(url, {
                    method: "GET",
                    credentials: "include",
                });

                if (response.status === 200) {
                    const data = await response.json();
                    setReservas(data);
                } else if (response.status === 404) {
                    console.log("No se encontraron reservas");
                } else if (response.status === 400) {
                    alert("El id no pertence a nadie")
                } else {
                    alert("Error al obtener las reservas");
                    const data = await response.json();
                    console.error(data, response.status)
                }
            } catch (err) {
                console.log("Error de conexión con el servidor", err);
            }
        };

        obtenerReservas();
    }, []);

    const [idReserva, setIdReserva] = useState(-1);
    const [eliminarModalState, setEliminarModalState] = useState(false)
    const [nombreAreaReserva, setNombreAreaReserva] = useState("Titulo")
    const [descripcionReserva, setDescripcionReserva] = useState("Descripcion")

    const [inicioReserva, setInicioReserva] = useState("")
    const [finReserva, setFinReserva] = useState("")
    const [fechaReserva, setFechaReserva] = useState("")




    const handleEliminar = async (e) => {
        e.preventDefault();

        if (idReserva == -1) {
            console.error("No hay área seleccionada para eliminar");
            return;
        }
        try {

            const res = await fetch(`https://lc82mg08-10000.brs.devtunnels.ms/api/area-comun/residente/eliminar-reserva/:${idReserva}`, {
                method: "DELETE",
                credentials: "include",
            });
            const data = await res.json();
            console.log("data delete:", data)
            alert(data.message);
            setEliminarModalState(false)
            setReservas(prev => ({
                ...prev,
                datos: prev.datos.filter(r => r.id_reserva !== idReserva)
            }));


        } catch (e) {
            console.error("error:", e)
        }
    }

    const settearEliminar = (p_reserva) => {
        setIdReserva(p_reserva.id_reserva)
        setFechaReserva(p_reserva.fecha)
        setInicioReserva(p_reserva.hora_inicio)
        setFinReserva(p_reserva.hora_fin)
        setNombreAreaReserva(p_reserva.nombre_area)
        setDescripcionReserva(p_reserva.descripcion)

        setEliminarModalState(true)
    }



    /**
     * EDITAR:
     */
    const [editarModalState, setEditarModalState] = useState(false);
    const [editarFecha, setEditarFecha] = useState(Date);
    const [editarInicio, setEditarInicio] = useState("");
    const [editarFin, setEditarFin] = useState("");

    const settearEditar = (reserva) => {
        setIdReserva(reserva.id_reserva);
        setNombreAreaReserva(reserva.nombre_area);
        setDescripcionReserva(reserva.descripcion);
        setEditarFecha(reserva.fecha);
        setEditarInicio(reserva.hora_inicio);
        setEditarFin(reserva.hora_fin);
        setEditarModalState(true);
    };

    const handleEditar = async (e) => {
        e.preventDefault();
        if (idReserva === -1) return;

        try {
            const res = await fetch(`https://lc82mg08-10000.brs.devtunnels.ms/api/area-comun/residente/editar-reserva`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    id_reserva: idReserva,
                    fecha: editarFecha,
                    inicio: editarInicio,
                    fin: editarFin
                })
            });

            const data = await res.json();
            alert(data.mensaje || data.message);

            if (res.status === 201) {
                // Actualizar el estado local
                setReservas(prev => ({
                    ...prev,
                    datos: prev.datos.map(r => r.id_reserva === idReserva
                        ? { ...r, fecha: editarFecha, hora_inicio: editarInicio, hora_fin: editarFin }
                        : r
                    )
                }));
                setEditarModalState(false);
            }

        } catch (error) {
            console.error("Error al editar:", error);
        }
    };

    const [modalPago,setModalPago]=useState(false)

    const handleModalPago=(e)=>
    {
        setModalPago(true)
        setIdReserva(e)
    }


    const [modalFoto,setModalFoto]=useState(false)
    const [urlComprobante,setUrlComprobante]=useState("")

    const handleMostrarFoto=(p_url)=>
    {
        setModalFoto(true)
        setUrlComprobante(p_url)
    }


    // if (reservas.datos) {

    //     return <Title p_text="Usted no tiene reservas" p_sz={3}/>
    // }

    // else
    {
        return <div className="c_Parqueo-CardsContainer">
            {editarModalState && (
                <CardModal p_close={() => setEditarModalState(false)}>
                    <form onSubmit={handleEditar}>
                        <Title p_text="Editar reserva" p_sz={2.5} />
                        <Input p_disabled={true} p_value={nombreAreaReserva} p_text="Nombre Área" />
                        <Input p_disabled={true} p_value={descripcionReserva} p_text="Descripción" />

                        <Input
                            p_value={editarFecha}
                            p_text="Fecha (AAAA-MM-DD)"
                            p_onChange={(e) => setEditarFecha(e)}
                            p_type="date"
                        />
                        <Input
                            p_value={editarInicio}
                            p_text="Hora Inicio"
                            p_onChange={(e) => setEditarInicio(e)}
                            p_type="time"
                        />
                        <Input
                            p_value={editarFin}
                            p_text="Hora Fin"
                            p_onChange={(e) => setEditarFin(e)}
                            p_type="time"
                        />

                        <Button p_class="okay" p_texto="Guardar cambios" p_type="submit" />
                    </form>
                </CardModal>
            )}

            {
                eliminarModalState && (
                    <CardModal p_close={() => { setEliminarModalState(false) }}>
                        <form onSubmit={handleEliminar}>
                            <Title
                                p_text='Esta seguro de eliminar?'
                                p_sz={2.5}
                            />
                            <Input
                                p_disabled={true}
                                p_value={nombreAreaReserva}
                                p_text='Nombre Area'
                            />
                            <Input
                                p_disabled={true}
                                p_value={descripcionReserva}
                                p_text='Descripcion'
                            />
                            <div style={{ display: "flex", gap: "5px", margin: "10px" }}>
                                <ColorText p_text={`Inicio: ${inicioReserva}`} p_type="warning" />
                                <ColorText p_text={`Fin: ${finReserva}`} p_type="warning" />
                                <ColorText p_text={`Fecha: ${fechaReserva.substring(0, 10)}`} p_type="warning" />
                            </div>

                            <Button
                                p_class='danger'
                                p_texto='Elimiar'
                                p_type='submit'
                            />
                        </form>

                    </CardModal>
                )
            }

            {
                modalPago && (<PagarQR p_close={()=>{setModalPago(false)}} p_idReserva={idReserva}/>)
            }

            {
                modalFoto && (<CardModal p_close={()=>{setModalFoto(false)}} p_closeText="Cerrar">
                    <Title p_text="Comprobante" p_sz={1.5}/>
                    <img src={`https://lc82mg08-10000.brs.devtunnels.ms/public${urlComprobante}`} alt="" width={300}/>
                </CardModal>)
            }

            {


                reservas.datos.map((reserva) => (
                    <CardImg
                        key={`miReserva_${reserva.id_reserva}`}

                        p_titulo={reserva.nombre_area}
                        p_descripcion={reserva.descripcion}
                        p_capacidad={reserva.dimension}
                        p_precio={`Total: ${reserva.costo_total}`}
                        p_horaCierre={`Hasta: ${reserva.hora_cierre}`}
                        p_horaApertura={`Desde: ${reserva.hora_apertura}`}
                        p_imgRoute={imgRoutes[reserva.nombre_area]}
                        p_disponible={reserva.disponibilidad == "HABILITADO"}
                        p_disponibilidad={reserva.disponibilidad}
                        p_buttonEnabled={true}
                        p_fecha={String(reserva.fecha).substring(0,10)}
                        p_onClickButton={() => { settearEliminar(reserva) }}
                        p_onClickButtonEdit={() => settearEditar(reserva)}

                        p_onClickButtonPagar={()=>{handleModalPago(reserva.id_reserva)}}
                        p_buttonPagar={!reserva.pagado}

                        p_onClickButtonMostrarFoto={()=>{handleMostrarFoto(reserva.url_pago)}}
                    />
                ))
            }
        </div>

    }
}