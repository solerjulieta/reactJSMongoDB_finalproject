import jwt from 'jsonwebtoken'
import * as TokensServices from '../services/tokens.services.js'
import {usuarioSchema, iniciarSesionSchema} from '../schemas/users.scheme.js'

function estaLogueado(req, res, next){
    const token = req.headers['auth-token']

    if(!token){
        return res.status(401).json({msj: 'El token no fue enviado.'})
    }

    try{
        const payload = jwt.verify(token, 'PW_AH3')

        TokensServices.buscarPorToken(token)
        .then(function(token){
            if(!token){
                return res.status(401).json({ msj: 'El token es inválido.' })
            }
            req.usuario = payload
            next()
        })
        .catch(function(){
            return res.status(401).json({ msj: 'El token es inválido.' })
        })
    }
    catch(err){
        return res.status(401).json({ msj: 'El token es inválido.' })
    }
}

function esAdmin(req, res, next){
    if(req.usuario.rol !== "1"){
        return res.status(401).json({ msj: 'No estás autorizado/a para esta acción.' })
    }
    next()
}

function iniciarSesionValido(req, res, next){
    iniciarSesionSchema.validate(req.body, { abortEarly: false })
    .then((data)=> {
        req.body = data
        next()
    })
    .catch((error) => {
        res.status(400).json({ errors: error.errors })
    })
}

function usuarioValido(req, res, next){
    usuarioSchema.validate(req.body, { abortEarly: false })
    .then((data) => {
        req.body = data;
        next()
    })
    .catch((error) => {
        res.status(400).json({ errors: error.errors })
    })
}

export {
    estaLogueado,
    esAdmin,
    iniciarSesionValido,
    usuarioValido
}