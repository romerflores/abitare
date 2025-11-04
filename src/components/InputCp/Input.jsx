import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

import './Input.css'
import { useState } from "react";


export function Input({ p_value = "", p_id = "xd", p_text = "label", p_placeHolder = "", p_onChange = () => { }, p_type = "text", p_direccion = "column" }) {

    const [hide, setHide] = useState(true)
    
    const handleHide = () => {
        if (hide) {
            p_type = 'password'
            setHide(false)
        }
        else {
            p_type = 'text'
            setHide(true)
        };
    }
    
    return <div className='c_input-container' style={{ flexDirection: p_direccion }}>
        <label htmlFor={p_id} className='c_input-label' >{p_text}</label>
        {(p_type == 'password')
            ?
            <div className="pwd-input" style={{position:'relative'}}>
                <input
                    className='c_input'
                    value={p_value}
                    placeholder={p_placeHolder}
                    onChange={(e) => p_onChange(e.target.value)}
                    type={p_type == 'password'
                        ? (hide?'password':'text')
                        : p_type}
                />
                <button type="button" onClick={handleHide} style={{backgroundColor:'transparent', border:'none', position:'absolute', top:'0', right:'5px', bottom:'0', margin:'0 auto', display:'flex', justifyContent:'center', alignItems:'center', cursor:'pointer'}}>
                    {hide ?<FaRegEyeSlash />:<FaRegEye/>}
                </button>
            </div>
            :
            <input
                className='c_input'
                value={p_value}
                placeholder={p_placeHolder}
                onChange={(e) => p_onChange(e.target.value)}
                type={p_type}
            />}
    </div>



}

export default Input;