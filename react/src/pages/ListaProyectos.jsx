import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import * as ProyectosService from '../services/projects.services.js';
import { Container, Table } from 'react-bootstrap';

function ListaProyectos(){
    const [proyectos, setProyectos] = useState([])

    useEffect(()=>{
        ProyectosService.VerTodos()
        .then(data => {
            setProyectos(data)
        })
    }, [])

    useEffect(()=>{
        console.log('proyectos')
    }, [proyectos]) 

    return (
            <Container className="lista-proyectos">
            <h2>Administración de Proyectos</h2>
                <Table>
                    <thead className="table-dark">
                        <tr>
                            <th>Proyecto</th>
                            <th>Descripción</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>                    
                    <tbody>
                    {proyectos.map((proyecto, index) => {
                        return (
                            <tr>
                                <td>{proyecto.name}</td>
                                <td>{proyecto.description}</td>
                                <td>
                                    <div className='botones'>
                                        <Link to={`/admin/projects/${proyecto._id}/eliminar`} className="btn btn-danger">Eliminar</Link>
                                        <Link to={`/admin/projects/${proyecto._id}/editar`} className="btn btn-primary">Editar</Link>
                                        <Link to={`/projects/${proyecto._id}`} className="btn btn-success">Ver</Link>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
                <Link to="/admin/projects/nuevo" className='btn-violet'>Agregar Proyecto</Link>
            </Container>
    );
}

export default ListaProyectos