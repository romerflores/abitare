
import { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

export default function Modal({ btn_label, modal_content, header_content = "Confirmar trabajo finalizado" }) {
    const [visible, setVisible] = useState(false);
    const footerContent = (
        <div>
            {typeof modal_content == "string"
                ?
                <>
                    <Button label="No" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
                    <Button label="Yes" icon="pi pi-check" onClick={() => setVisible(false)} autoFocus />
                </>
                :
                <Button label="Cerrar" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
                }
        </div>
    );

    return (
        <div className="card flex justify-content-center">
            <Button label={btn_label} icon="pi pi-check" onClick={() => setVisible(true)} severity="success" style={{ gap: '0', padding: '5px', position:'static'}} />
            <Dialog header={header_content} visible={visible} style={{ width: '80vw', backgroundColor: '#fff', padding: '30px' }} onHide={() => { if (!visible) return; setVisible(false); }} footer={footerContent}>
                {
                    typeof modal_content == "string"
                        ?
                        <p>{modal_content}</p>
                        :
                        modal_content
                }
            </Dialog>
        </div>
    )
}
