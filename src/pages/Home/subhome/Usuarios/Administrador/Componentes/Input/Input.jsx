
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";

export default function Input({ value, setValue, label, tipo='text'}) {
    return (
        <>
            <div className="card flex justify-content-center">
                <FloatLabel>
                    <label className="s_form-label" htmlFor="username">{label}</label>
                    <InputText className="s_form-input" id="username" value={value} onChange={(e) => setValue(e.target.value)} type={tipo} />
            </FloatLabel>
        </div>
        </>
    )
}
