import './ColorText.css'

export default function ColorText({p_type="okay",p_text="siu"})
{
    return <span className={`c_ColorText ${p_type}`}>
        {p_text}
    </span>
}