import './Button.css'

export function Button({p_texto="Hola",p_class="okay",p_type="none",p_onClick=()=>{}})
{   

    return <button className={`c_button ${p_class}`} type={p_type} onClick={p_onClick}>
        {p_texto}
    </button>
}

export default Button