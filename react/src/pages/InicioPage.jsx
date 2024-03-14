import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import * as ProyectosService from '../services/projects.services.js';
import { Row, Col, Card, Form} from 'react-bootstrap';

function InicioPage(){
    const [proyectos, setProyectos] = useState([])

    useEffect(()=>{
        ProyectosService.VerPublicos()
        .then(data => {
            setProyectos(data)
        })
    }, [])

    useEffect(()=>{
        console.log('proyectos')
    }, [proyectos])

    return(
        <>
            <section className='sobre-mi'>
                <Row>
                    <Col lg={5} md={5}>
                    <h2>Sobre mí</h2>
                    <p>¡Hola! Soy Julieta Soler.</p>
                    <p> Soy <strong>Diseñadora Gráfica y Publicitaria</strong>, y actualmente estoy estudiando <strong>Diseño y Programación Web</strong>.</p>
                    <p> Me gusta brindar lo mejor de mí en cada proyecto que me proponen, motivo por el cual me gusta aprender y perfeccionarme constantemente; manteniéndome al tanto de las tendencias, haciendo cursos y estudiando.</p>
                    </Col>
                    <Col lg={3} md={5} className="img-centrada">
                        <picture>
                            <source media="(max-width: 576px)" srcSet="/img/mobile-julieta-soler.png" />
                            <img src="../img/julieta-soler.png" alt="Julieta Soler Diseñadora y Desarroladora" />
                        </picture>
                    </Col>
                </Row>
            </section>
            <section className='mis-servicios'>
                <h2>Mis servicios</h2>
                <Row>
                    <Col md={3}>
                        <Card>
                            <Card.Body>
                                <Card.Img variant="top" src="../img/diseñografico.png" alt="ícono de diseño gráfico" />
                                <h3>Diseño Gráfico</h3>
                                <Card.Text>Traduzco esa idea, ese sueño, esos valores de tu proyecto con gran creatividad.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <Card.Body>
                                <Card.Img variant="top" src="../img/diseñouiux.png" alt="ícono de diseño ui/ux" />
                                <h3>Diseño UI/UX</h3>
                                <Card.Text>Diseño de experiencias únicas y maravillosas no solo para vos, sino también para tus clientes.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <Card.Body>
                                <Card.Img variant="top" src="../img/desarrolloweb.png" alt="ícono de desarrollo web" />
                                <h3>Desarrollo Web</h3>
                                <Card.Text>Obtené tu sitio web personal o empresarial construido con ideas creativas.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </section>
            <section className="trab-recientes">
                <h2>Trabajos recientes</h2>
                <Row>
                {proyectos.map((proyecto, index) => {
                    return (
                        <Col md={5}>
                        <Card>
                            <Card.Body>
                                <Card.Img variant="top" src={proyecto.img} alt={proyecto.name} />
                                <h3><a href={proyecto.link} target="_blank">{proyecto.name}</a></h3>
                                <Card.Text>{proyecto.description}</Card.Text>
                                <Link to={`/projects/${proyecto._id}`}>Ver proyecto</Link>
                            </Card.Body>
                        </Card>
                    </Col>
                    )
                })}
                </Row>
            </section>
            <section className='contacto'>
                <div>
                    <h2>Contacto</h2>
                    <p>¡Vamos a diseñar tu proyecto juntxs!</p>
                    <p>Completá el formulario y te enviaré el presupuesto. También podes comunicarte conmigo a través de mis redes sociales.</p>
                </div>
                    <Form>
                        <Form.Group className='mb-3' controlId="formBasicEmail">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId="formBasicEmail">
                            <Form.Label>Mensaje</Form.Label>
                            <Form.Control as="textarea" />
                        </Form.Group>
                        <button className='btn-violet float-end'>Enviar</button>
                    </Form>
            </section>
        </>
    );
}

export default InicioPage