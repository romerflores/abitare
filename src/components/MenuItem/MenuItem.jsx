import Button from "../Button/Button"
import "./MenuItem.css"
import { svgRoutes } from "../../utils/assetRoutes"

export default function MenuItem({p_logo="AUTOMOVIL",p_text="MenuItem",p_type="noSelect",p_onClick=()=>{}})
{
    return <div className={`c_menuItem-container ${p_type}`} onClick={p_onClick} > 
        <img src={svgRoutes[p_logo]} alt={p_logo} width={"20px"} />
        <span>{p_text}</span>
    </div>
}