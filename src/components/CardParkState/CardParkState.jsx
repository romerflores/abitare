import './CardParkState.css'
import { svgRoutes } from '../../utils/assetRoutes'
import { stateMapping } from '../../utils/stateMapping'
import Title from '../Title/Title'
import ColorText from '../ColorText/ColorText'


export function CardParkState({p_logo="Car",p_position="A-01",p_type="Normal",p_state="Libre",p_placa="AAA-123",p_onClick})
{

    const muestra=(p_state=="Libre")?"none":"block";

    return <div className='c_CardParkState' onClick={p_onClick}>
        <img src={svgRoutes[p_logo]} alt={p_logo}  style={{width:"20px"}}/>
        <Title p_text={p_position} p_align='center' p_sz={1.5}/>
        <span>{p_type}</span>
        <ColorText
            p_text={p_state}
            p_type={stateMapping[p_state]}
        />
        <span style={{fontSize:"15px",color:"var(--color-plomo-1)",display:muestra}}>{p_placa}</span>
    </div>
}


export default CardParkState