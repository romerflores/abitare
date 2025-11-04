import { useEffect } from "react"
import CardParkState from "../../../../components/CardParkState/CardParkState"
import ColorText from "../../../../components/ColorText/ColorText"
import LittleCard from "../../../../components/LittleCard/LittleCard"
import Title from "../../../../components/Title/Title"
import Button from "../../../../components/Button/Button"
import Input from "../../../../components/Input/Input"
import './Parqueo.css'
import { useState } from "react"
import CardModal from "../../../../components/CardModal/CardModal"
import { validatePlaca } from "../../../../utils/validators"

export function Parqueo() {

    const [dataEspacios, setDataEspacios] = useState([])
    const [total, setTotal] = useState(0)
    const [disponibles, setDisponibles] = useState(0)
    const [ocupados, setOcupados] = useState(0)
    const [porcentajeOcupados, setPorcentajeOcupados] = useState(0)



    useEffect(() => {
        const obtenerUsuarios = async () => {
            try {
                const res = await fetch("http://localhost:10000/api/estacionamiento", {
                    method: "GET",
                    credentials: "include", // si se usa galletitas :v
                });

                const data = await res.json();

                if (!res.ok) {
                    alert(data.message);
                }
                else {
                    setDataEspacios(data["estacionamientos"])
                    setTotal(data["total"])
                    setDisponibles(data["disponibles"])
                    setOcupados(data["ocupados"])
                    setPorcentajeOcupados(data["porcentajeOcupados"])

                }
            } catch (error) {
                console.error(error)
                window.location.href = "/login";
            }
        };

        obtenerUsuarios();
    }, []);


    const [modalOpenLibre, setModalOpenLibre] = useState(false);
    const [modalOpenOcupado, setModalOpenOcupado] = useState(false);
    const [placa, setPlaca] = useState("")
    const [registro, setRegistro] = useState("");
    const [idParqueo, setIdParqueo] = useState("")

    const handlePlaca = (e) => {
        if (validatePlaca(e)) setPlaca(e);
    }
    const handleRegistro = (e) => {
        setRegistro(e);
    }

    const handleLibre = (p_id = "") => {
        setModalOpenLibre(true)
        setIdParqueo(p_id)
    }

    const handleOcupado = (p_id = "") => {
        setModalOpenOcupado(true)
        setIdParqueo(p_id)

    }

    const handleSubmitLibre = async (element) => {
        element.preventDefault()

        try {
            const respuesta= await fetch("http://localhost:10000/api/estacionamiento/registrar-entrada",
                {
                    method:"POST",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body:JSON.stringify(
                        {
                            placa:placa,
                            parqueo:idParqueo
                        }
                    ),
                    credentials:"include"

                }
            );

            const data = await respuesta.json();

            if (respuesta.status == 400) {
                alert(data.message);
                return;
            }
            if(!respuesta.ok)
            {
                console.error(respuesta)
            }
            else
            {
                alert("Registro exitoso");
                location.href = '/home';
            }

        } catch (error) {
            console.error(error)
        }
    }

    const handleSubmitSalida = async (element) => {
        element.preventDefault()
        try {
            const respuesta = await fetch("http://localhost:10000/api/estacionamiento/registrar-salida",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(
                        {
                            parqueo: idParqueo,
                            registro: registro
                        }
                    ),
                    credentials: "include"
                }
            );

            const data = await respuesta.json();
            if (respuesta.status == 400) {
                alert(data.message);
                return;
            }
            if (!respuesta.ok) {
                console.error(respuesta)
            }
            else {
                alert("Se ha registrado la salida")
                location.href = '/home'
            }

        } catch (error) {
            console.error(error)
        }
    }


    return <div className="c_Parqueo-container">

        {modalOpenLibre && (
            <CardModal p_close={() => setModalOpenLibre(false)}>
                <form onSubmit={handleSubmitLibre}>
                    <Title
                        p_text={`Lugar: ${idParqueo}`}
                        p_sz={2}
                    />
                    <Input
                        p_text="Ingrese Placa"
                        p_onChange={handlePlaca}
                        p_value={placa}
                    />
                    <Button
                        p_texto="Confirmar"
                        p_type="submit"
                    />
                </form>

            </CardModal>
        )}

        {modalOpenOcupado && (
            <CardModal p_close={() => setModalOpenOcupado(false)}>
                <form onSubmit={handleSubmitSalida}>
                    <Title
                        p_text={`Quiere Liberar ${idParqueo}?`}
                        p_sz={2}
                    />
                    <Input
                        p_text="Ingrese parqueo"
                        p_onChange={handleLibre}
                        p_value={idParqueo}
                        p_disabled={true}
                    />
                    {/* <Input
                        p_text="Ingrese el número de registro"
                        p_onChange={handleRegistro}
                        p_value={registro}
                    /> */}
                    <Button
                        p_texto="Liberar"
                        p_type="submit"
                    />
                </form>
            </CardModal>
        )}

        <div className="c_titulo">
            <Title
                p_text="Gestion de estacionamiento"
                p_sz={2.5}
                p_align="start"
            />
            <Title
                p_text="Administra los espacios del estacionamiento del edificio"
                p_sz={1.5}
                p_align="start"
            />
        </div>
        <div className="c_Parqueo-CardsContainer">
            <LittleCard
                p_logo="Location"
                p_text="Total espacios"
                p_number={total}
            />
            <LittleCard
                p_logo="AUTOMOVIL"
                p_text="Ocupados"
                p_number={ocupados}
            />
            <LittleCard
                p_logo="Tick"
                p_text="Disponibles"
                p_number={disponibles}
            />
            <LittleCard
                p_logo="Time"
                p_text="Reservados"
                p_number="69"//realizarlo con la query al backend
            />
            <LittleCard
                p_logo="Users"
                p_text="Ocupacion"
                p_number={`${porcentajeOcupados}%`}
            />
        </div>

        <div className="p_Parqueo-ZoneInfo">
            <Title p_text="Zona A" p_sz={2} />
            <ColorText p_text={`${total} Espacios`} />
        </div>
        <div className="c_Parqueo-CardsContainer">

            {dataEspacios.map((e) => (
                e.zona == 'ZONA A' &&
                <CardParkState
                    key={e.id_parqueo}
                    p_onClick={() => {
                        if (e.disponibilidad == "LIBRE") {
                            handleLibre(e.id_parqueo)
                        }
                        else if (e.disponibilidad == "OCUPADO") {
                            handleOcupado(e.id_parqueo)
                        }
                    }}
                    p_logo={e.tipo_vehiculo}
                    p_position={e.posicion}
                    p_state={e.disponibilidad}
                />
            )
            )}
        </div>
        <div className="p_Parqueo-ZoneInfo">
            <Title p_text="Zona B" p_sz={2} />
            <ColorText p_text="X-Espacios" />
        </div>
        <div className="c_Parqueo-CardsContainer">
            {dataEspacios.map((e) => (
                e.zona == 'ZONA B' && <CardParkState
                    key={e.id_parqueo}
                    p_logo={e.tipo_vehiculo}
                    p_position={e.posicion}
                    p_state={e.disponibilidad}
                />
            )
            )}

            {/* TODO Realizar un for mapping con CardParkState para encontrar todas las ubicacion y sus respectivos estados */}
        </div>
    </div>
}

export default Parqueo