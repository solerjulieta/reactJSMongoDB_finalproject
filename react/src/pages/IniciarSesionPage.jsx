import { useState } from 'react'
import { IniciarSesion } from '../services/users.services';
import { Container, Form, Row } from 'react-bootstrap'

function IniciarSesionPage({estaLogueado}){
    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    function onSubmit(e){
        e.preventDefault();

        IniciarSesion(email, password)
        .then(({token, usuario})=> {
            estaLogueado(token, usuario);
        })
        .catch(err => {
            setErrors(err.errors);
        })
    }

    function onChangeEmail(e){
        setEmail(e.target.value);
    }

    function onChangePassword(e){
        setPassword(e.target.value);
    }

    return(
        <Container className="iniciar-sesion">
            <Row>
                <h2>Iniciar Sesión</h2>
                {errors.map((error, index) => (
                        <span className="errores" key={index}><i className="bi bi-exclamation-circle"></i> {error}</span>
                ))}
                <Form onSubmit={onSubmit}>
                    <Form.Group className='mb-3'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" onChange={onChangeEmail} value={email} />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" onChange={onChangePassword} value={password} />  
                    </Form.Group>
                    <button type="submit" className='btn-violet'>Ingresar</button>
                </Form>
            </Row>
        </Container>
    )
}

export default IniciarSesionPage