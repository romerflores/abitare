import './select.css';
import { MultiSelect } from 'primereact/multiselect';

export default function Select({opcion, setOpcion, opciones, tipo_select}) {
    const cities = opciones;

    return (
        <div className="card flex justify-content-center caja-select">
            <MultiSelect value={opcion} onChange={(e) => setOpcion(e.value)} options={cities} optionLabel=""
                placeholder={tipo_select} maxSelectedLabels={1} className="w-full md:w-20rem" />
        </div>
    );
}
