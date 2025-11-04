import { useEffect, useState } from "react";
import { imgRoutes } from "../../../utils/assetRoutes";
import CardImg from "../../../components/CardImg/CardImg";
import Modal from "../../../components/Modal/Modal";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import CardModal from "../../../components/CardModal/CardModal";
import Title from "../../../components/Title/Title";
import PagarQR from "./PagarQR";



export default function Reservar() {

    const [areasComunesData, setAreasComunesData] = useState({ datos: [] });
    const [modalReservar, setModalReservar] = useState(false)

    const [currtId, setCurrtId] = useState(-1)



    const handleSetReservar = (p_area) => {
        setNombre(p_area.nombre)
        setCurrtId(p_area.id_area)
        setAcuerdo(p_area.acuerdo_uso)
        console.log(acuerdo)
        setModalReservar(true)

    }

    const [nombre, setNombre] = useState("")
    const [fecha, setFecha] = useState(Date);
    const [horaInicio, setHoraInicio] = useState();
    const [horaFin, setHoraFin] = useState("");
    const [acuerdo, setAcuerdo] = useState("")
    const [acepto, setAcepto] = useState(false)

    const handleAcepto = () => {
        setAcepto(!acepto)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const usuario = Number(localStorage.getItem("id")); // ID del residente

        const payload = {
            usuario: usuario,
            id_area: Number(currtId),
            fecha: fecha,
            inicio: horaInicio,
            fin: horaFin,
            acuerdo:acepto
        };


        try {
            const response = await fetch("https://lc82mg08-10000.brs.devtunnels.ms/api/area-comun/residente/reservar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
                credentials: "include",
            });

            if (response.status === 201) {
                const data = await response.json();
                alert("Reserva realizada con éxito ✅");
                console.log(data);
                setCurrtId("");
                setFecha("");
                setHoraInicio("");
                setHoraFin("");
            } else {
                const errorData = await response.json();
                console.error("Error al registrar reserva:", errorData);
                alert(errorData.message || "Error al realizar la reserva ❌");
            }
        } catch (err) {
            console.error("Error de conexión:", err);
            alert("Error al conectar con el servidor");
        }
    };

    const handleCerrarModal = () => {
        setModalReservar(false)
        setAcepto(false)
    }

    useEffect(() => {
        fetch("https://lc82mg08-10000.brs.devtunnels.ms/api/area-comun").then((res) => res.json()).then((data) => {
            setAreasComunesData(data);
        }).catch((error) => {
            console.error("Error: ", error)
        });
    }, [])




    const [modalAcuerdo,setModalAcuerdo]=useState(false)
    const handleCerrarAcuerdo=()=>{
        setModalAcuerdo(false)
    }



    const [modalPago,setModalPago]=useState(false)


    return <div className="c_Parqueo-CardsContainer">
        {
            modalReservar && (<CardModal p_close={() => { handleCerrarModal(); }}>
                <form className="c_form" onSubmit={handleSubmit}>
                    <Title
                        p_text={nombre}
                        p_sz={2}
                    />
                    <Input
                        p_type="text"
                        p_disabled={true}
                        p_placeHolder="ID del Área"
                        p_value={currtId}
                        p_text="Codigo Area"
                    // p_onChange={(e) => setCurrtId(e.target.value)}
                    />
                    <Input
                        p_text="Fecha"
                        p_type="date"
                        p_value={fecha}
                        p_onChange={(e) => setFecha(e)}
                    />
                    <Input
                        p_text="Hora Inicio"
                        p_type="time"
                        p_value={horaInicio}
                        p_onChange={(e) => setHoraInicio(e)}
                    />
                    <Input
                        p_text="Hora Fin"
                        p_type="time"
                        p_value={horaFin}
                        p_onChange={(e) => setHoraFin(e)}
                    />

                    <label >Acepto el Acuerdo de Uso</label>
                    <input type="checkbox" checked={acepto} onChange={() => handleAcepto()} />

                    <a
                        onClick={()=>{setModalAcuerdo(true)}}
                        href="#"
                    >
                        {`Acuerdo de uso ${nombre}`}
                    </a>



                    <Button p_texto="Reservar Área Común" p_type="submit" />
                </form>

            </CardModal>)
        }

        {
            modalAcuerdo && (<CardModal p_close={()=>handleCerrarAcuerdo()} p_closeText="Cerrar" >

                {
                    <>
                        <Title p_text={`Acuerdo de uso de ${nombre}`} p_sz={2}/>
                        {acuerdo}
                    </>
                }

            </CardModal>)
        }

        {
            modalPago && (
                <PagarQR/>
            )
        }

        {
            areasComunesData.datos.map((area) => (
                <CardImg
                    key={`areaComun_${area.id_area}`}

                    p_titulo={area.nombre}
                    p_descripcion={area.descripcion}
                    p_capacidad={area.dimension}
                    p_precio={`$${area.costo_por_hora}/h`}
                    p_horaCierre={`Cierra: ${area.hora_cierre}`}
                    p_horaApertura={`Abre: ${area.hora_apertura}`}
                    p_imgRoute={imgRoutes[area.nombre]}
                    p_disponible={area.disponibilidad == "HABILITADO"}
                    p_disponibilidad={area.disponibilidad}

                    p_userButtonEnabled={area.disponibilidad == "HABILITADO"}
                    p_onClickButton={() => { handleSetReservar(area) }}
                />
            ))
        }
    </div>
}