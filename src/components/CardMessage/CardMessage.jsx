import "./CardMessage.css"

export default function CardMessage({p_ref,p_class="danger",p_text="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod vel error atque. Veniam in illum, voluptatum magnam voluptas saepe eius quam cupiditate quis nam repudiandae voluptatibus accusamus, officia commodi expedita!"})
{
    return <div className={`c_cardMessage ${p_class}`} ref={p_ref}>
        {p_text}
    </div>
}

