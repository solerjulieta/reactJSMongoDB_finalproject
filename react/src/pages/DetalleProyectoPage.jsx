import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import * as ProyectosService from '../services/projects.services.js';
import {  Row, Col, Card, } from 'react-bootstrap'

function DetalleProyectoPage(){
    const {id} = useParams()
    const [proyecto, setProyecto] = useState(null)
    const [testimonios, setTestimonios] = useState([])

    useEffect(() => {
        ProyectosService.ObtenerPorId(id)
        .then((data)=>{
            setProyecto(data)
            return ProyectosService.VerTestimonios(id)
        })
        .then((data)=> {
            setTestimonios(data)
        })
    }, [id])


    return (
            <>
                {proyecto && (
                    <section className="container detalle-proyecto">
                        <Row>
                            <Col>
                                <img className="img-fluid" src={proyecto.img} alt={proyecto.name} />
                            </Col>
                            <Col>
                                <h2>{proyecto.name}</h2>
                                <p>{proyecto.description}</p>
                                <p><a className='btn-violet' href={proyecto.link} target="_blank">Visitar sitio</a></p>
                            </Col>
                        </Row>
                    </section>
                )}
                {testimonios && (
                    <section className="container testimonios">
                        <h3>Testimonios de clientes:</h3>
                            <div className='card-testimonios'>
                            {testimonios.map((testimonio) => { 
                                return (
                                    <Card>
                                        <Card.Body>
                                            <Card.Text className="icono-quote"><i className="bi bi-quote"></i></Card.Text>
                                            <Card.Text>"{testimonio.testimonial}"</Card.Text>
                                            <Card.Text className='negrita'>{testimonio.name} - {testimonio.company}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                )
                            })}
                            </div>
                    </section>
                )}
                {testimonios.length === 0 && (
                    <div className="container">
                      <span>No hay testimonios.</span>
                    </div>
                )}
            </>
    )
}

export default DetalleProyectoPage