import Title from '../Title/Title'
import './CardContent.css'

export default function CardContent({children,p_titulo="Titulo de Contenido",p_descripcion="Descripcion breve"}) {
    return <div className='c_cardContent'>
        <div className="c_titulo">
            <Title
                p_text={p_titulo}
                p_sz={2.5}
                p_align="start"
            />
            <Title
                p_text={p_descripcion}
                p_sz={1.5}
                p_align="start"
            />
        </div>
        {children}
    </div>
}