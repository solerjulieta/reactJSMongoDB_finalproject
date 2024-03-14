import { useState } from 'react'
import * as UsuariosService from '../services/users.services'
import { Container, Row, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function RegistroPage(){
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    function nameChange(e){
        setName(e.target.value)
    }

    function emailChange(e){
        setEmail(e.target.value)
    }

    function passwordChange(e){
        setPassword(e.target.value)
    }

    function registrarUsuario(e){
        e.preventDefault()
        UsuariosService.Registro({
            name,
            email,
            password
        })
        .then(function(){
            navigate('/iniciar-sesion')
        })
        .catch(err => {
            setErrors(err.errors);
        })
    }

    return(
        <Container className='registro'>
            <Row>
                <h2>Registrarse</h2>
                {errors.map((error, index) => (
                        <span className="errores" key={index}><i className="bi bi-exclamation-circle"></i> {error}</span>
                ))}
                <Form onSubmit={registrarUsuario}>
                    <Form.Group className='mb-3'>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" onChange={nameChange} value={name} />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" onChange={emailChange} value={email} />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" onChange={passwordChange} value={password} />
                    </Form.Group>
                    <button type="submit" className='btn-violet'>Registrarme</button>
                </Form> 
            </Row>
        </Container>
    )
}

export default RegistroPage