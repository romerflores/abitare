import './Title.css'

export function Title({ p_text = "Esto es un titulo", p_sz = 10,p_bold="none" ,p_align="center"}) {

    return (
        <h1 className="c_title" style={{fontSize:p_sz*10,fontWeight:p_bold,textAlign:{p_align}}}>
            {p_text}
        </h1>
    )


}

export default Title