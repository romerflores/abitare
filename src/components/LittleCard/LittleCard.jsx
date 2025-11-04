import { svgRoutes } from "../../utils/assetRoutes"
import "./LittleCard.css"

export function LittleCard({p_text="desc",p_number="15",p_logo="Car"})

{
    
    return <div className="c_LittleCard">
        <div className="c_LittleCard-info">
            <span className="c_LittleCard-text">{p_text}</span>
            <h2 style={{color:"var(--color-plomo-1)",fontSize:"30px"}}>{p_number}</h2>
        </div>
        <img className="c_LittleCard-logo" src={svgRoutes[p_logo]} alt=""  />
    </div>
}

export default LittleCard