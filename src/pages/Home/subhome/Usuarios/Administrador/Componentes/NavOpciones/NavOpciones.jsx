import './NavOpciones.css';
import { Menubar } from 'primereact/menubar';

export default function NavOpciones({setPage}) {
    const items = [
        {
            label: 'Registrar',
            icon: 'pi pi-user-plus registrar',
            className:'item',
            items: [
                {
                    label: 'Nuevo usuario',
                    icon: 'pi pi-user',
                    command: () => {
                        setPage('registrar-usuario')
                    }
                },
                {
                    label: 'Nueva visita',
                    icon: 'pi pi-id-card',
                    command: () => {
                        setPage('registrar-visita')
                    }
                }, {
                    label: 'Nuevo personal',
                    icon: 'pi pi-wrench',
                    command: () => {
                        setPage('registrar-personal')
                    }
                },
                {
                    separator:true,
                }
            ]
        },
        {
            label: 'Residentes',
            icon:'pi pi-users',
            command: () => {
                setPage('residentes')
            },
        },
        {
            label: 'Visitantes',
            icon:'pi pi-id-card',
            command: () => {
                setPage('visitantes')
            }
        },
        {
            label: 'Personal',
            icon:'pi pi-briefcase',
            command: () => {
                setPage('personal')
            }
            /* items: [
                {
                    label: 'Components',
                    icon: 'pi pi-bolt'
                },
                {
                    label: 'Blocks',
                    icon: 'pi pi-server'
                },
                {
                    label: 'UI Kit',
                    icon: 'pi pi-pencil'
                },
                {
                    label: 'Templates',
                    icon: 'pi pi-palette',
                    items: [
                        {
                            label: 'Apollo',
                            icon: 'pi pi-palette'
                        },
                        {
                            label: 'Ultima',
                            icon: 'pi pi-palette'
                        }
                    ]
                }
            ] */
        },
    ];

    return (
        <div className="card">
            <Menubar model={items} className='menubar'/>
        </div>
    )
}
