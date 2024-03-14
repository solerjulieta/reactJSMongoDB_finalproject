import express from 'express'
import * as ProjectsApiController from '../controllers/projects.api.controllers.js'
import { estaLogueado } from '../../middleware/auth.middleware.js'
import { proyectoValido } from '../../middleware/projectValidate.middleware.js'

const router = express.Router()

router.route('/api/projects')
      .post([proyectoValido, estaLogueado], ProjectsApiController.Crear)
      .get(ProjectsApiController.VerTodos)

router.route('/api/projects/:id')
      .patch([estaLogueado], ProjectsApiController.Editar)
      .delete([estaLogueado], ProjectsApiController.Eliminar)
      .get(ProjectsApiController.ObtenerPorId)

router.route('/api/projects/:id/testimonials')
      .get(ProjectsApiController.VerTestimonios)
      .post(ProjectsApiController.CrearTestimonio)

router.route('/api/projects/testimonials/:id')
      .delete(ProjectsApiController.EliminarTestimonio)

router.route('/api/projects/:id/gallery')
      .get(ProjectsApiController.VerGaleria)
      .post(ProjectsApiController.AgregarImgAGaleria)

router.route('/api/projects/:id/gallery/:imgId')
      .delete(ProjectsApiController.EliminarImgGaleria)

export default router