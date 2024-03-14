import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Container, Card, Form } from 'react-bootstrap'

import * as ProyectosService from '../services/projects.services.js';

function ProyectoEliminarPage(){
    const navigate = useNavigate()
    const {id} = useParams()
    const [proyecto, setProyecto] = useState(null)
    const [testomonios, setTestimonios] = useState([])

    useEffect(()=>{
        ProyectosService.ObtenerPorId(id)
        .then((data)=>{
            setProyecto(data)
            return ProyectosService.VerTestimonios(id)
        })
        .then((data)=>{
            setTestimonios(data)
        })
    }, [id])

    function eliminarProyecto(e){
        e.preventDefault()

        ProyectosService.EliminarProyecto(id)
        .then(function(){
            navigate('/admin/projects')
        })
    }
    return(
            <section className="eliminar-proyecto">
                <h2>¿Eliminar proyecto?</h2>
                {proyecto && (
                    <Card>
                        <Card.Body>
                            <Card.Img variant="top" src={proyecto.img} />
                            <h3>{proyecto.name}</h3>
                            <Card.Text>{proyecto.description}</Card.Text>
                            <a className='btn-violet' href={proyecto.link} target="_blank">Ir al sitio</a>
                        </Card.Body>
                        <div className='btns'>
                            <Form onSubmit={eliminarProyecto}>
                                <button className='btn btn-danger'>Eliminar</button>
                            </Form>
                            <Link className='btn btn-secondary' to="/admin/projects">Cancelar</Link>
                        </div>
                    </Card>
                )}
            </section>
    )
}

export default ProyectoEliminarPage