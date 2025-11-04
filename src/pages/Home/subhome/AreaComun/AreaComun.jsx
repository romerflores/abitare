import { useEffect, useRef, useState } from 'react';
import CardContent from '../../../../components/CardContent/CardContent';
import CardImg from '../../../../components/CardImg/CardImg';
import LittleCard from '../../../../components/LittleCard/LittleCard';
import { imgRoutes } from '../../../../utils/assetRoutes';
import './AreaComun.css';
import MenuItem from '../../../../components/MenuItem/MenuItem';
import Modal from '../../../../components/Modal/Modal';
import CardModal from '../../../../components/CardModal/CardModal';
import Input from '../../../../components/Input/Input';
import Button from '../../../../components/Button/Button';
import Title from '../../../../components/Title/Title';
import CardMessage from '../../../../components/CardMessage/CardMessage';
import Calendar from '../../../../components/Calendar/Calendar';

export default function AreaComun() {


    const errorRef = useRef(null);


    const [areasComunesData, setAreasComunesData] = useState({ datos: [] });

    useEffect(() => {
        fetch("https://lc82mg08-10000.brs.devtunnels.ms/api/area-comun").then((res) => res.json()).then((data) => {
            setAreasComunesData(data);
        }).catch((error) => {
            console.error("Error: ", error)
        });
    }, [])


    const [crearModalState, setCrearModalState] = useState(false)
    const [eliminarModalState, setEliminarState] = useState(false)
    const [editarModalState, setEditarState] = useState(false)


    const [currtId, setCurrtId] = useState(-1)
    const [nombreArea, setNombreArea] = useState("")
    const [descripcionArea, setDescripcionArea] = useState("")
    const [tipoArea, setTipoArea] = useState("")
    const [estadoArea,setEstadoArea]=useState("HABILITADO")
    const [dimensionArea, setDimensionArea] = useState("")
    const [horaAperturaArea, setHoraAperturaArea] = useState("")
    const [horaCierreArea, setHoraCierreArea] = useState("")
    const [costoHora, setCostoHora] = useState(0)
    const [acuerdoUso, setAcuerdoUso] = useState("")
    const [errorCardState, setErrorCardState] = useState(false)


    const handleSubmitCrear = async (e) => {

        e.preventDefault();

        if (!(nombreArea.length >= 4 &&
            descripcionArea.length >= 4 &&
            tipoArea.length >= 2 &&
            dimensionArea.length >= 1 &&
            // horaAperturaArea.length >= 5 &&
            // horaCierreArea.length >= 5 &&
            Number(dimensionArea) >= 1

        )) {
            setErrorCardState(true)

            errorRef.current.scrollIntoView({ behavior: "smooth", block: "start" });

            return
        }

        setErrorCardState(false);

        // Preparar payload según documentación
        const payload = {
            nombre: nombreArea,
            descripcion: descripcionArea,
            disponibilidad: estadoArea,
            tipo: tipoArea,
            dimension: Number(dimensionArea),
            costo: costoHora,
            apertura: horaAperturaArea,
            cierre: horaCierreArea,
            acuerdo: acuerdoUso
        };
        console.log(payload)


        try {
            const response = await fetch("https://lc82mg08-10000.brs.devtunnels.ms/api/area-comun/crear", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
                credentials: 'include'

            });

            if (response.status === 200) {
                // Registro exitoso

                setCrearModalState(false)
                alert("Creado exitosmente")
                

                const areasResponse = await fetch("https://lc82mg08-10000.brs.devtunnels.ms/api/area-comun", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                });
                const areasData = await areasResponse.json();

                // Actualizar el estado con la data completa
                setAreasComunesData({ datos: areasData.datos });


                console.log("Área comun registrada con éxito");
                // Limpiar campos si quieres
                setNombreArea("");
                setDescripcionArea("");
                setTipoArea("");
                setDimensionArea("");
                setHoraAperturaArea("");
                setHoraCierreArea("");
                setAcuerdoUso("");
                setCrearModalState(false);
            } else {
                // Error en la creación
                const data = await response.json();
                console.error("Error al crear área:", data);
                setErrorCardState(true);
            }
        } catch (err) {
            console.error("Error dbg", err);
            setErrorCardState(true);
        }


    }

    const handleSettear = (p_area) => {
        setCurrtId(p_area.id_area)
        setNombreArea(p_area.nombre)
        setDescripcionArea(p_area.descripcion)
        setEliminarState(true)
    }

    const handleSettearEditar = (p_area) => {
        setCurrtId(p_area.id_area)
        setNombreArea(p_area.nombre)
        setDescripcionArea(p_area.descripcion)
        setTipoArea(p_area.tipo)
        setDimensionArea(p_area.dimension)
        setHoraAperturaArea(p_area.hora_apertura)
        setHoraCierreArea(p_area.hora_cierre)
        setCostoHora(p_area.costo_por_hora)
        setAcuerdoUso(p_area.acuerdo_uso)
        setEditarState(true)
    }


    const handleSubmitEditar = async (e) => {
        e.preventDefault();

        // if (!(nombreArea.length >= 4 &&
        //     descripcionArea.length >= 4 &&
        //     tipoArea.length >= 2 &&
        //     dimensionArea.length >= 1 &&
        //     Number(dimensionArea) >= 1
        // )
        // ) {
        //     setErrorCardState(true);
        //     errorRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        //     return;
        // }

        setErrorCardState(false);

        const payload = {
            id: Number(currtId),
            nombre: nombreArea,
            descripcion: descripcionArea,
            disponibilidad: estadoArea,
            tipo: tipoArea,
            dimension: Number(dimensionArea),
            apertura: horaAperturaArea,
            cierre: horaCierreArea,
            costo: costoHora,
            acuerdo: acuerdoUso
        };
        console.log(payload)


        try {
            const response = await fetch("https://lc82mg08-10000.brs.devtunnels.ms/api/area-comun/actualizar", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
                credentials: "include",
            });

            if (response.status === 400) {
                alert("Rellene todos los campos correctamente")
                return
            }

            if (response.status === 200) {
                alert("Área común actualizada con éxito");

                // Obtener todas las áreas
                const areasResponse = await fetch("https://lc82mg08-10000.brs.devtunnels.ms/api/area-comun", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                });
                const areasData = await areasResponse.json();

                // Actualizar el estado con la data completa
                setAreasComunesData({ datos: areasData.datos });

                setEditarState(false);
                setCurrtId(-1);
                setNombreArea("");
                setDescripcionArea("");
                setTipoArea("");
                setDimensionArea("");
                setHoraAperturaArea("");
                setHoraCierreArea("");
                setCostoHora("");
                setAcuerdoUso("")
            } else {
                const data = await response.json();
                console.error("Error al actualizar área:", data);
                setErrorCardState(true);
            }
        } catch (err) {
            console.error("Error de red:", err);
            setErrorCardState(true);
        }
    };



    const handleEliminar = async (e) => {

        e.preventDefault(); // si viene de un form, evita recarga

        if (currtId == -1) {
            console.error("No hay área seleccionada para eliminar");
            return;
        }

        try {
            const response = await fetch(`https://lc82mg08-10000.brs.devtunnels.ms/api/area-comun/eliminar/${currtId}`, {
                method: "DELETE",
                credentials: 'include'
            });

            if (response.status === 200) {
                console.log("Área eliminada con éxito");

                // Opcional: actualizar la lista de áreas sin recargar
                setAreasComunesData(prev => ({
                    datos: prev.datos.filter(a => a.id_area !== currtId),
                }));

                // Cerrar modal
                setEliminarState(false);

                // Limpiar estados relacionados
                setCurrtId(-1);
                setNombreArea("");
                setDescripcionArea("");
            } 
            else if(response.status===400)
            {
                alert("No se puede borrar por que hay reservas actuales")
            }
            else {
                const data = await response.json();
                console.error("Error al eliminar área:", data);
            }
        } catch (err) {
            console.error("Error de red:", err);
        }

    }

    const handleSettearAgregar = () => {
        setCurrtId(-1);
        setNombreArea("");
        setDescripcionArea("");
        setTipoArea("");
        setDimensionArea("");
        setHoraAperturaArea("");
        setHoraCierreArea("");
        setCostoHora("");
        setAcuerdoUso("")

        setCrearModalState(true)
        setErrorCardState(false)
    }



    return <CardContent p_titulo='Areas Comunes' p_descripcion='Reserva y administracion de espacios comunes'>
        <Calendar />
        {
            <>
                {
                    eliminarModalState && (
                        <CardModal p_close={() => { setEliminarState(false) }}>
                            <form onSubmit={handleEliminar}>
                                <Title
                                    p_text='Esta seguro de eliminar?'
                                    p_sz={2.5}
                                />
                                <Input
                                    p_disabled={true}
                                    p_value={nombreArea}
                                    p_text='Nombre Area'
                                />
                                <Input
                                    p_disabled={true}
                                    p_value={descripcionArea}
                                    p_text='Descripcion'
                                />
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
                    crearModalState && (
                        <CardModal p_close={() => { setCrearModalState(false) }}>

                            <form onSubmit={handleSubmitCrear}>
                                <Title
                                    p_text={`Agregar una nueva area`}
                                    p_sz={2}
                                />

                                {
                                    errorCardState && (
                                        <CardMessage
                                            p_text="Rellene todos los campos correctamente!!!"
                                            p_ref={errorRef}
                                        />
                                    )
                                }

                                <Input
                                    p_text="Ingrese Nombre del area"
                                    p_onChange={(e) => { setNombreArea(e) }}
                                    p_value={nombreArea}
                                    p_placeHolder='ej: Salon de Eventos'
                                />
                                <Input
                                    p_text="Ingrese descripcion del area"
                                    p_onChange={(e) => { setDescripcionArea(e) }}
                                    p_value={descripcionArea}
                                    p_placeHolder='ej: Lugar recreativo'
                                />
                                <select name="Estado" onChange={(e)=>setEstadoArea(e.target.value)} id="state" style={{ width: "60%", margin: "5px" }}>
                                    <option value="HABILITADO" id='state' >Activo</option>
                                    <option value="DESHABILITADO" id='state' >Inactivo</option>
                                    <option value="REPARACION" id='state' >Reparacion</option>
                                </select>
                                <Input
                                    p_text="Tipo de Area"
                                    p_onChange={(e) => { setTipoArea(e) }}
                                    p_value={tipoArea}
                                    p_placeHolder='ej: Eventos, Mantenimiento'
                                />
                                <Input
                                    p_text="Ingrese capacidad"
                                    p_onChange={(e) => { setDimensionArea(e) }}
                                    p_value={dimensionArea}
                                    p_placeHolder='ej: 40'
                                    p_type='number'
                                />
                                <Input
                                    p_text='Ingrese costo por hora'
                                    p_onChange={(e) => { setCostoHora(e) }}
                                    p_value={costoHora}
                                    p_placeHolder='20'
                                    p_type='number'
                                />
                                <Input
                                    p_text="Hora Apertura"
                                    p_onChange={(e) => { setHoraAperturaArea(e) }}
                                    p_value={horaAperturaArea}
                                    p_type='time'
                                />
                                <Input
                                    p_text="Hora Cierre"
                                    p_onChange={(e) => { setHoraCierreArea(e) }}
                                    p_value={horaCierreArea}
                                    p_type='time'

                                />

                                <Input
                                    p_text="Acuerdo de Uso para el Usuario"
                                    p_onChange={(e) => { setAcuerdoUso(e) }}
                                    p_value={acuerdoUso}
                                    p_type='text'

                                />


                                <Button
                                    p_texto="Confirmar"
                                    p_type="submit"
                                />
                            </form>
                        </CardModal>
                    )
                }

                {
                    editarModalState && (
                        <CardModal p_close={() => { setEditarState(false) }}>

                            <form onSubmit={handleSubmitEditar}>
                                <Title
                                    p_text={`Editar el Area`}
                                    p_sz={2}
                                />

                                {
                                    errorCardState && (
                                        <CardMessage
                                            p_text="Rellene todos los campos correctamente!!!"
                                            p_ref={errorRef}
                                        />
                                    )
                                }

                                <Input
                                    p_text="Ingrese Nombre del area"
                                    p_onChange={(e) => { setNombreArea(e) }}
                                    p_value={nombreArea}
                                    p_placeHolder='ej: Salon de Eventos'
                                />
                                <Input
                                    p_text="Ingrese descripcion del area"
                                    p_onChange={(e) => { setDescripcionArea(e) }}
                                    p_value={descripcionArea}
                                    p_placeHolder='ej: Lugar recreativo'
                                />
                                <select name="Estado" onChange={(e) => setEstadoArea(e.target.value)} id="state" style={{ width: "60%", margin: "5px" }}>
                                    <option value="HABILITADO" id='state' >Activo</option>
                                    <option value="DESHABILITADO" id='state' >Inactivo</option>
                                    <option value="REPARACION" id='state' >Reparacion</option>
                                </select>
                                <Input
                                    p_text="Tipo de Area"
                                    p_onChange={(e) => { setTipoArea(e) }}
                                    p_value={tipoArea}
                                    p_placeHolder='ej: Eventos, Mantenimiento'
                                />
                                <Input
                                    p_text="Ingrese capacidad"
                                    p_onChange={(e) => { setDimensionArea(e) }}
                                    p_value={dimensionArea}
                                    p_placeHolder='ej: 40'
                                    p_type='number'
                                />
                                <Input
                                    p_text='Ingrese costo por hora'
                                    p_onChange={(e) => { setCostoHora(e) }}
                                    p_value={costoHora}
                                    p_placeHolder='20'
                                    p_type='number'
                                />
                                <Input
                                    p_text="Hora Apertura"
                                    p_onChange={(e) => { setHoraAperturaArea(e) }}
                                    p_value={horaAperturaArea}
                                    p_type='time'
                                />
                                <Input
                                    p_text="Hora Cierre"
                                    p_onChange={(e) => { setHoraCierreArea(e) }}
                                    p_value={horaCierreArea}
                                    p_type='time'

                                />

                                <Input
                                    p_text="Acuerdo de Uso para el Usuario"
                                    p_onChange={(e) => { setAcuerdoUso(e) }}
                                    p_value={acuerdoUso}
                                    p_type='text'

                                />


                                <Button
                                    p_texto="Confirmar"
                                    p_type="submit"
                                />
                            </form>
                        </CardModal>
                    )
                }

                <div className="c_Parqueo-CardsContainer">

                    <LittleCard
                        p_logo='Location'
                        p_text="Total Areas"
                        p_number={areasComunesData.datos.length + areasComunesData.datos.length}
                    />
                    <LittleCard
                        p_logo='Tick'
                        p_text="Disponibles"
                        p_number={areasComunesData.datos.length}
                    />
                    {/* <LittleCard
                        p_logo='Calendar'
                        p_text="Reservas para hoy"
                    />
                    <LittleCard
                        p_logo='Money'
                        p_text="Ingresos Mes"
                        p_number='$315.00'
                    /> */}

                </div>

                <MenuItem
                    p_type='selected'
                    p_text='Agregar area'
                    p_logo={"Add2"}
                    p_onClick={() => { handleSettearAgregar() }}
                />
                <div className="c_Parqueo-CardsContainer">
                    {
                        areasComunesData.datos.map((area) => (
                            <CardImg
                                key={`areaComun_${area.id_area}`}

                                p_titulo={area.nombre}
                                p_descripcion={area.descripcion}
                                p_capacidad={area.dimension}
                                p_precio={area.costo_por_hora}
                                p_horaApertura={`Abre: ${area.hora_apertura}`}
                                p_horaCierre={`Cierra: ${area.hora_cierre}`}
                                p_disponibilidad={area.disponibilidad}
                                p_imgRoute={imgRoutes[area.nombre]}
                                p_disponible={area.disponibilidad == "HABILITADO"}
                                p_buttonEnabled={true}
                                p_onClickButton={() => { handleSettear(area) }}
                                p_onClickButtonEdit={() => { handleSettearEditar(area) }}
                            />
                        ))
                    }

                </div>
            </>
        }
    </CardContent>
}
