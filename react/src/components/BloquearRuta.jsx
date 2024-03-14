import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function BloquearRuta({ estaAutenticado, children }){
    const navigate = useNavigate();
    useEffect(() => {
        if(!estaAutenticado){
            navigate('/iniciar-sesion');
        }
    }, [estaAutenticado])

    return estaAutenticado ? children : null
}

export default BloquearRuta