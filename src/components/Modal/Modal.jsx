import "./Modal.css"
import Button from '../Button/Button';


export default function Modal({p_close=()=>{}}) {
    return <div className="c_modal">
        <div className="c_modal-Container">
            <Button
                p_onClick={p_close}
                p_class='warning'
                p_texto='Cancelar'
            />
        </div>

    </div>
}