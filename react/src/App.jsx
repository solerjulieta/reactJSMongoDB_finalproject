import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import './App.css'

import InicioPage from './pages/InicioPage';
import ListaProyectos from './pages/ListaProyectos';
import AgregarProyectoPage from './pages/AgregarProyectoPage';
import NotFoundPage from './pages/NotFoundPage';
import DetalleProyectoPage from './pages/DetalleProyectoPage';
import ProyectoEditarPage from './pages/ProyectoEditarPage';
import ProyectoEliminarPage from './pages/ProyectoEliminarPage';
import IniciarSesionPage from './pages/IniciarSesionPage';
import RegistroPage from './pages/RegistroPage';
import BloquearRuta from './components/BloquearRuta';

import * as UsersServices from './services/users.services';

function App() {
  const navigate = useNavigate();
  const [estaAutenticado, setestaAutenticado] = useState(null);

  useEffect(()=>{
    if(localStorage.getItem('token')){
      setestaAutenticado(true);
    } else {
      setestaAutenticado(false);
    }
  }, [])

  function estaLogueado(token, usuario){
    if(token){
      localStorage.setItem('token', token);
      setestaAutenticado(true);
      navigate('/');
    } else {
      localStorage.removeItem('token');
      setestaAutenticado(false);
    }
  }

  function cerrarSesion(){
    localStorage.removeItem('token');
    setestaAutenticado(false);
    navigate('/iniciar-sesion');
    UsersServices.CerrarSesion();
  }

  if(estaAutenticado === null){
    return <div>Loading...</div>
  }

  return (
    <div className="App">
      <header className="fixed-top bg-gray">
        <h1 className="logo">Julieta Soler - Diseñadora Gráfica & Desarrolladora y Programadora Web</h1>
        <nav className="navbar navbar-dark navbar-expand-lg">
            <div className="container">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#barra" aria-controls="barra" aria-expanded="false" aria-label="Botón hamburguesa">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="barra">
                    <ul className="navbar-nav ms-auto links">
                    <li><Link to='/'>Inicio</Link></li>
                    {!estaAutenticado && <>
                      <li><Link to='/registro'>Registrarse</Link></li>
                      <li><Link to='iniciar-sesion'>Iniciar sesión</Link></li>              
                    </>}
                    {estaAutenticado && <>
                      <li><Link to='/admin/projects'>Administrar Proyectos</Link></li>
                      <li><a onClick={cerrarSesion} className="btn">Cerrar sesión</a></li>
                    </>}
                    </ul>
                </div>
            </div>
        </nav>
      </header>
        <Routes>
          <Route path='/' element={< InicioPage />} />
          <Route path='/iniciar-sesion' element={< IniciarSesionPage estaLogueado={estaLogueado} />} />
          <Route path='/registro' element={ < RegistroPage /> } />
          <Route path='/admin/projects' element={<ListaProyectos />} />
          <Route path='/projects/:id' element={<DetalleProyectoPage />} />
          <Route path='/admin/projects/:id/editar' element={ <BloquearRuta estaAutenticado={estaAutenticado}> < ProyectoEditarPage /> </BloquearRuta>} />
          <Route path='/admin/projects/:id/eliminar' element={<BloquearRuta estaAutenticado={estaAutenticado}>< ProyectoEliminarPage /></BloquearRuta>} />
          <Route path='/admin/projects/nuevo' element={<BloquearRuta estaAutenticado={estaAutenticado}>< AgregarProyectoPage /></BloquearRuta>} />
          <Route path='*' element={< NotFoundPage />} />
        </Routes>
    </div>
  )
}

export default App
