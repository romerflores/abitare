
import { imgRoutes } from '../../../utils/assetRoutes'
import RegisterForm from './RegisterForm'
import Card from '../../../components/Card/Card'
import Title from '../../../components/Title/Title'


export function Register()
{
    return <Card>
        <img src={imgRoutes.LOGO} alt="Esto es el logo" style={{ width: 100 }} />
        <Title p_text='Registro' p_sz={3} />
        <Title p_text='Ingresa los datos del nuevo usuario' p_sz={2} />
        <RegisterForm/>

    </Card>

}

export default Register