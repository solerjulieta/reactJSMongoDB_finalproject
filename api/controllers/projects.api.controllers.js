import * as ProjectsService from '../../services/projects.services.js'
import * as TestimonialsService from '../../services/testimonials.services.js'
import { ObjectId } from 'mongodb'

function VerTodos(req, res){
    const filtro = {}

    if(req.query.show){
        filtro.show = req.query.show
    }

    if(req.query.technologies){
        filtro.technologies = req.query.technologies
    }

    ProjectsService.traerProyectos(filtro)
    .then(function(proyectos){
        res.status(200).json(proyectos)
    })
}

function Crear(req, res){

    ProjectsService.agregarProyecto(req.body)
    .then(function(nuevoProyecto){
        res.status(200).json(nuevoProyecto)
    })
    .catch(function(err){
        res.status(500).json({ msj: 'Error al intentar guardar el proyecto.' })
    })
}

function Editar(req, res){
    const id = req.params.id
    const proyecto = {}

    if(req.body.name){
        proyecto.name = req.body.name
    }
    if(req.body.description){
        proyecto.description = req.body.description
    }
    if(req.body.link){
        proyecto.link = req.body.link
    }
    if(req.body.img){
        proyecto.img = req.body.img
    }
    if(req.body.show){
        proyecto.show = req.body.show
    }

    ProjectsService.editarProyecto(id, proyecto)
    .then(function(){
        return ProjectsService.traerUnProyecto(id)
    })
    .then(function(proyectoEditado){
        res.status(200).json(proyectoEditado)
    })
}

function Eliminar(req, res){
    const id = req.params.id

    ProjectsService.eliminarProyecto(id)
    .then(function(proyectoEliminado){
        res.status(200).json(proyectoEliminado)
    })
    .catch(function(err){
        res.status(500).json({ msj: 'Hubo un error al intentar eliminar el proyecto.' })
    })
}

function ObtenerPorId(req, res){
    const id = req.params.id

    ProjectsService.traerUnProyecto(id)
    .then(function(proyecto){
        res.status(200).json(proyecto)
    })
    .catch(function(err){
        res.status(404).json({ msj: 'No se encontró el proyecto.' })
    })
}

function VerTestimonios(req, res){
    const id = req.params.id

    TestimonialsService.obtenerTestimonio(id)
    .then(function(testimonios){
        res.status(200).json(testimonios)
    })
}

function CrearTestimonio(req, res){
    const id = req.params.id
    const testimonio = {
        name: req.body.name,
        company: req.body.company,
        testimonial: req.body.testimonial
    }

    TestimonialsService.agregarTestimonio(id, testimonio)
    .then(function(testimonio){
        res.status(201).json(testimonio)
    })
    .catch(function(err){
        res.status(500).json({ msj: 'Hubo un error al intentar agregar el testimonio.' })
    })
}

function EliminarTestimonio(req, res){
    const id = req.params.id

    TestimonialsService.eliminarTestimonio(id)
    .then(function(testimonioEliminado){
        res.status(201).json(testimonioEliminado)
    })
    .catch(function(err){
        res.status(500).json({ msj: 'Hubo un error al intentar eliminar el testimonio.' })
    })    
}

function VerGaleria(req, res){
    const id = req.params.id

    ProjectsService.obtenerGaleria(id)
    .then(function(galeria){
        res.status(200).json(galeria)
    })
}

async function AgregarImgAGaleria(req, res){
    const id = req.params.id
    const proyecto = await ProjectsService.traerUnProyecto(id)
    if(proyecto){
        const img = {
            id: new ObjectId(),
            url: req.body.url,
            description: req.body.description
        }
        await ProjectsService.agregarImgAGaleria(id, img)
        res.status(200).json({ msj: 'Imagen agregada a galeria.' })
    } else{
        res.status(404).json({ msj: 'Proyecto no encontrado.' })
    }
}

async function EliminarImgGaleria(req, res){
    const id = req.params.id
    const imgId = req.params.imgId

    await ProjectsService.eliminarImgGaleria(id, imgId)

    res.status(200).json({ msj: 'Imagen eliminada con éxito' })
}

export{
    Crear,
    Editar,
    Eliminar,
    ObtenerPorId,
    VerTodos,
    VerTestimonios,
    CrearTestimonio,
    EliminarTestimonio,
    VerGaleria,
    AgregarImgAGaleria,
    EliminarImgGaleria
}