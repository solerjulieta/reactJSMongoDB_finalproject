import express from 'express'
import * as UsersApiController from '../controllers/users.api.controller.js'
import {iniciarSesionValido, usuarioValido} from '../../middleware/auth.middleware.js'

const router = express.Router()

router.route('/api/users')
      .get(UsersApiController.VerTodos)
      .post([usuarioValido], UsersApiController.Crear)

router.route('/api/users/login')
      .post([iniciarSesionValido], UsersApiController.IniciarSesion)

router.route('/api/users/logout')
      .post(UsersApiController.CerrarSesion)

router.route('/api/users/:id')
      .delete(UsersApiController.Eliminar)

export default router