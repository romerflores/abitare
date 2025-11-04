import "./CardImg.css"
import { imgRoutes, svgRoutes } from "../../utils/assetRoutes"

import Title from "../Title/Title"
import ColorText from "../ColorText/ColorText"
import Button from "../Button/Button"
import { FaLocust } from "react-icons/fa6"


export default function CardImg({ p_id = "-1", p_onClickButton = () => { }, p_onClickButtonEdit = () => { }, p_imgRoute = imgRoutes.LOGO, p_horaApertura = "10:00", p_horaCierre = "23:00", p_disponible = false, p_capacidad = "30", p_precio = "400", p_titulo = "Esto es una Card", p_descripcion = "Describe el contenido de tu card", p_buttonEnabled = false, p_disponibilidad = "HABILITADO", p_userButtonEnabled = false, p_fecha = "", p_buttonPagar = false,p_onClickButtonPagar=()=>{} , p_onClickButtonMostrarFoto=()=>{}}) {
    return <div className="c_CardImg shadow">
        <img className="c_CardImg-img" src={p_imgRoute} alt="" />
        <div className="c_CardImg-text">
            <Title
                p_text={p_titulo}
                p_sz={1.8}
            />
            <span className="c_LittleCard-text">{p_descripcion}</span>
        </div>
        <div className="c_CardImg-tags">
            <ColorText
                p_text={(p_disponibilidad)}
                p_type={(p_disponible ? "okay" : "danger")}
            />
            <ColorText
                p_text={`${p_capacidad} personas`}
                p_type="warning"
            />
            <ColorText
                p_text={`${p_precio}`}
                p_type="warning"
            />

            <ColorText
                p_text={`${p_horaApertura}`}
                p_type="warning"
            />

            <ColorText
                p_text={`${p_horaCierre}`}
                p_type="warning"
            />

            {
                p_fecha != "" && (<ColorText
                    p_text={`Fecha: ${p_fecha}`}
                    p_type="warning"
                />)
            }
        </div>

        {
            p_buttonEnabled && (

                <div style={{ display: "flex", margin: "10px", gap: "10px" }}>
                    {
                        p_buttonPagar && (

                            <a title="Borrar" className="c_aLogo danger" onClick={p_onClickButton}>
                                <img src={svgRoutes.Close} alt="" width={"30px"} />
                            </a>
                        )
                    }

                    {
                        p_buttonPagar && (
                            <a title="Editar" className="c_aLogo warning" onClick={p_onClickButtonEdit}>
                                <img src={svgRoutes.Edit} alt="" width={"30px"} />
                            </a>

                        )
                    }

                    {
                        p_buttonPagar && (
                            <button title="Pagar" className="c_aLogo warning" onClick={p_onClickButtonPagar}>
                                <img src={svgRoutes.PAGAR} alt="" width={"30px"} />
                            </button>
                        )
                    }

                    {
                        !p_buttonPagar && (
                            <button title="Mostrar Comprobante" className="c_aLogo warning" onClick={p_onClickButtonMostrarFoto}>
                                <img src={svgRoutes.FOTO} alt="" width={"30px"} />
                            </button>
                        )
                    }
                </div>
            )
        }

        {
            p_userButtonEnabled && (
                <div style={{ display: "flex", margin: "10px" }}>
                    <a title="Reservar" className="c_aLogo warning" onClick={p_onClickButton} style={{ backgroundColor: "green" }}>
                        <img src={svgRoutes.Add} alt="" width={"30px"} />
                    </a>
                </div>
            )
        }




    </div>
}