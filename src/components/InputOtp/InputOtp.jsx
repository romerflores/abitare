import './inputOtp.css';

import { InputOtp } from 'primereact/inputotp';

export default function InputOtpConfirm({code, setCode}) {
    return (
        <div className="card flex justify-content-center">
            <InputOtp value={code} onChange={(e) => setCode(e.value)} integerOnly length={6}/>
        </div>
    );
}
