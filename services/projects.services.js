import { MongoClient, ObjectId } from 'mongodb'

const client = new MongoClient('mongodb://127.0.0.1:27017')

const db = client.db('AH_P3')
const proyectos = db.collection('Projects')
const testimonios = db.collection('Testimonials')
const galerias = db.collection('Galleries')

async function traerProyectos(filtro){
    if(filtro && filtro.show == "true"){
        filtro.show = true
    } else if(filtro && filtro.show == "false"){
        filtro.show = false
    }
    return client.connect()
    .then(function(){
        return proyectos.find(filtro).toArray()
    })
    .catch(function(err){
        return []
    })
}

async function traerUnProyecto(id){
    return client.connect()
    .then(function(){
        return proyectos.findOne({ _id: new ObjectId(id) })
    })
}

async function agregarProyecto(proyecto){
    if(proyecto.show == "true" || proyecto.show == true ){
        proyecto.show = true
    } 
    if(proyecto.show == "false" || proyecto.show == false) {
        proyecto.show = false
    } 
    const nuevoProyecto = {
        ...proyecto,
    }
    return client.connect()
    .then(function(){
        return proyectos.insertOne(nuevoProyecto)
    })
    .then(function(result){
        return nuevoProyecto
    })
}

async function eliminarProyecto(id){
    await client.connect()

    const proyecto = await proyectos.deleteOne({ _id: new ObjectId(id) })
    const testimonio = await testimonios.deleteMany({ proyecto_id: new ObjectId(id) })
    const galeria = await galerias.deleteOne({ proyect_id: new ObjectId(id)})
    
    return proyecto
}

async function editarProyecto(id, proyecto){
    if(proyecto.show == "true"){
        proyecto.show = true
    } else if(proyecto.show == "false") {
        proyecto.show = false
    }
    return client.connect()
    .then(function(){
        if(proyecto.technologies){
            return proyectos.updateOne(
                { _id: new ObjectId(id) },
                { $set: proyecto }
            )
        } else {
            return proyectos.updateOne(
                { _id: new ObjectId(id) }, 
                { $set: proyecto }
            )
        }
    })
}

async function obtenerGaleria(id){
    return client.connect()
    .then(function(){
        return galerias.findOne({ proyect_id: new ObjectId(id) })
    })
}

async function agregarImgAGaleria(id, img){
    return client.connect()
    .then(function(){
        return galerias.updateOne(
            { proyect_id: new ObjectId(id) },
            { $push: { imgs: img} }
        )
    })
    .then(function(result){
        if(result.modifiedCount === 0){
            return galerias.insertOne({
                proyect_id: new ObjectId(id),
                imgs: [img]
            })
        }
    })
}

async function eliminarImgGaleria(id, imgId){
    return client.connect()
    .then(function(){
        return galerias.updateOne(
            { proyect_id: new ObjectId(id) },
            { $pull: { imgs: { id: new ObjectId(imgId) } } }
        )
    })
}

export{
    traerProyectos,
    agregarProyecto,
    traerUnProyecto,
    eliminarProyecto,
    editarProyecto,
    obtenerGaleria,
    agregarImgAGaleria,
    eliminarImgGaleria
}