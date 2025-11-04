import Title from "../../../components/Title/Title";
import Card from "../../../components/Card/Card";
import LoginForm from "./LoginForm";
import './Login.css'

import logoAbitare from '../../../../public/img/logoAbitare.png'


export function Login() {

    

    return (
        <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Card>
                <img src={logoAbitare} alt="Esto es el logo" style={{ width: 200 }} />
                <Title p_text='Abitare' p_sz={3} />
                <span className="subtitle">Accede a tu panel de residente o administrador</span>
                <LoginForm />
            </Card>
        </div>
    )

}

export default Login