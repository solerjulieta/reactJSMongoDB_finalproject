import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import * as ProyectosService from '../services/projects.services.js';
import { Container, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap';

function AgregarProyectoPage(){
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [link, setLink] = useState('')
    const [img, setImg] = useState('')
    const [show, setShow] = useState('')

    const navigate = useNavigate()

    function nameChange(e){
        setName(e.target.value)
    }

    function descriptionChange(e){
        setDescription(e.target.value)
    }

    function linkChange(e){
        setLink(e.target.value)
    }

    function imgChange(e){
        setImg(e.target.value)
    }

    function showChange(e){
        setShow(e.target.value)
    }

    function saveProject(e){
        e.preventDefault()
        ProyectosService.Crear({
            name,
            description,
            link,
            img,
            show
        })
        .then(function(){
            navigate('/admin/projects')
        })
        .catch(err => {
            console.log(err);
            setErrors(err.errors);
        })
    }

    return(
        <section className="admin-form">
            <h2>Agregar proyecto</h2>
            {errors.map((error, index) => (
                        <span className="errores" key={index}><i className="bi bi-exclamation-circle"></i> {error}</span>
            ))}
            <Form onSubmit={saveProject}>
                <Form.Group className="mb-3">
                    <Form.Label>Nombre del Proyecto:</Form.Label>
                    <Form.Control type="text" name="name" onChange={nameChange} value={name} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <FormLabel>Descripción:</FormLabel>
                        <Form.Control as="textarea" rows="3" name="description" onChange={descriptionChange} value={description} />
                </Form.Group>
                <FormGroup className="mb-3">
                    <FormLabel>Link:</FormLabel>
                        <Form.Control type="url" name="url" onChange={linkChange} value={link} />
                </FormGroup>
                <FormGroup className="mb-3">
                    <Form.Label>Link de imagen</Form.Label>
                        <Form.Control type="url" name="img" onChange={imgChange} value={img} />
                </FormGroup>
                <span>Seleccioná si querés publicar o no el proyecto:</span>
                <FormGroup className="mb-3">
                    <FormLabel>Mostrar 
                        <input type="radio" value="true" name="show" onChange={showChange} />
                    </FormLabel>
                </FormGroup>
                <FormGroup className="mb-3">
                    <FormLabel>Ocultar 
                        <input type="radio" value="false" name="show" onChange={showChange} />
                    </FormLabel>
                </FormGroup>
                <button className='btn btn-primary'>Agregar</button>
                <Link to="/admin/projects" className='btn btn-secondary'>Cancelar</Link>
            </Form>
        </section>
    );
}

export default AgregarProyectoPage;