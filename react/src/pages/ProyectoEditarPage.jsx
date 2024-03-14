import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Form } from 'react-bootstrap'

import * as ProyectosService from '../services/projects.services';

function ProyectoEditarPage(){
    const navigate = useNavigate()
    const {id} = useParams()
    
    const [proyecto, setProyecto] = useState(null)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [link, setLink] = useState('')
    const [img, setImg] = useState('')
    const [show, setShow] = useState('')
    
    useEffect(()=> {
        ProyectosService.ObtenerPorId(id)
        .then((data)=>{
            setProyecto(data)
        })
    }, [id])

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

    function editarProyecto(e){
        e.preventDefault()

        ProyectosService.EditarProyecto(id, {
            name,
            description,
            link,
            img,
            show,
        })
        .then(function(){
            navigate('/admin/projects')
        })
    }

    return(
        <section className="admin-form">
                <h2>Editar proyecto</h2>
                {proyecto && (
                    <Form onSubmit={editarProyecto}>
                        <Form.Group className='mb-3'>
                            <Form.Label>Nombre del proyecto:</Form.Label>
                            <Form.Control type="text" onChange={nameChange} defaultValue={proyecto.name}  />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Descripción:</Form.Label>
                            <Form.Control as="textarea" rows="3" onChange={descriptionChange} defaultValue={proyecto.description} />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Link:</Form.Label>
                            <Form.Control type="url" onChange={linkChange} defaultValue={proyecto.link} />                            
                        </Form.Group>
                        <span>Imagen actual</span>
                        <img src={proyecto.img} alt={proyecto.name} className="img-fluid" />
                        <Form.Group className='mb-3'>
                            <Form.Label>Link de imagen:</Form.Label>
                            <Form.Control type="url" onChange={imgChange} defaultValue={proyecto.img} placeholder={proyecto.img}  />                            
                        </Form.Group>
                        <span>Seleccioná si querés publicar o no el proyecto</span>
                        <Form.Group className="mb-3">
                            <Form.Label>Mostrar 
                                <input type="radio" value="true" name="show" onChange={showChange} defaultChecked={proyecto.show === true ? 'checked' : ''} />
                            </Form.Label>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Ocultar 
                                <input type="radio" value="false" name="show" onChange={showChange} defaultChecked={proyecto.show === false ? 'checked' : ''} />
                            </Form.Label>
                        </Form.Group>
                        <button className='btn btn-primary'>Actualizar</button>
                        <Link to="/admin/projects" className="btn btn-secondary">Cancelar</Link>
                    </Form>
                )}
        </section>
    )
}

export default ProyectoEditarPage