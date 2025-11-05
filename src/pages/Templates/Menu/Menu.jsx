import MenuItem from "../../../components/MenuItem/MenuItem"
import Title from "../../../components/Title/Title"
import { imgRoutes, svgRoutes } from "../../../utils/assetRoutes"

import "../../Home/Home.css"
import { MENU_ITEMS } from "../../../utils/consts"

import { useNavigate } from "react-router"


export default function Menu({p_pageSelected="home", p_setPageSelected=()=>{}})
{
    const navegador=useNavigate();

    const handleLogOut = async () => {
        const response = await fetch('https://abitare-back-production.up.railway.app/api/usuario/logout', {
            method: "DELETE",
            credentials: "include", // si se usa galletitas :v
        });
        alert("Hola")
        
        localStorage.clear();
        
        sessionStorage.clear()
        
        
        navegador("/login",{replace:true})
    }

    return(
        <div className="c_menu-Container">

            <div className="c_menu-userInfo">
                <img src={imgRoutes["LOGO"]} alt="logo abitare" width={"70px"} />
                <Title p_text="Abitare" p_sz={2}/>
            </div>
            {
                MENU_ITEMS.map((item)=>(
                    <MenuItem
                        p_text={item.texto}
                        key={item.id}
                        p_type={p_pageSelected==item.id?"selected":"noSelect"}
                        p_onClick={() => {
                            p_setPageSelected(item.id)
                            if (window.location.href.split('/').slice(-1) == 'admin-anuncios' || window.location.href.split('/').slice(-1) == 'admin-votaciones' || window.location.href.split('/').slice(-1) == 'admin-chat' || window.location.href.split('/').slice(-1) == 'admin-quejas') {
                                window.location.href='/administrador/dashboard'
                            }
                        }}
                        p_logo={item.logo}
                        
                    />
                ))
            }

            <div className="c_menu-logOut" onClick={handleLogOut}>
                <img src={svgRoutes["SALIR"]} alt="" width={"20px"}/>
                <span>Salir</span>
            </div>

        </div>
    )
}