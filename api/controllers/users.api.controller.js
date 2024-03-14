import jwt from 'jsonwebtoken'
import * as UsersServices from '../../services/users.services.js'
import * as TokensServices from '../../services/tokens.services.js'

function VerTodos(req, res){
    const filter = {}

    UsersServices.traerUsuarios(filter)
        .then(function(usuarios){
            res.status(200).json(usuarios)
        })
}

function Crear(req, res){
    const usuario = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        rol: "2"
    }

    UsersServices.agregarUsuario(usuario)
    .then(function(nuevoUsuario){
        res.status(200).json(nuevoUsuario)
    })
    .catch(function(err){
        res.status(400).json({ msj: err.message })
    })
}

function Eliminar(req, res){
    const id = req.params.id

    UsersServices.eliminarUsuario(id)
    .then(function(){
        res.status(204).end()
    })
}

function IniciarSesion(req, res){
    const usuario = {
        email: req.body.email,
        password: req.body.password
    }

    UsersServices.iniciarSesion(usuario)
    .then(function(usuario){
        const token = jwt.sign({ id: usuario._id, rol: usuario.rol }, 'PW_AH3')

        TokensServices.crearToken({token: token, usuario_id: usuario._id})
        .then(function(){
            res.status(200).json({token, usuario})
        })
        .catch(function(err){
            res.status(500).json({msj: 'Hubo un error al intentar guardar el token.'})
        })
    })
    .catch(function(err){
        res.status(400).json({ msj: err.message })
    })
}

function CerrarSesion(req, res){
    const token = req.headers['auth-token']

    TokensServices.eliminarPorToken(token)
    .then(function(){
        res.status(200).json({ msj: 'Sesión cerrada.' })
    })
}

export{
    VerTodos,
    Crear,
    Eliminar,
    IniciarSesion,
    CerrarSesion
}