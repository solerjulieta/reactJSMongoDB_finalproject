import {MongoClient, ObjectId} from 'mongodb'

const client = new MongoClient('mongodb://127.0.0.1:27017')
const db = client.db('AH_P3')
const testimonios = db.collection('Testimonials')

async function obtenerTestimonio(idProyecto){
    return client.connect()
    .then(function(){
        return testimonios.find({ proyecto_id: new ObjectId(idProyecto) }).toArray()
    })
}

async function agregarTestimonio(idProyecto, testimonio){
    const nuevoTestimonio = {
        ...testimonio,
        proyecto_id: new ObjectId(idProyecto)
    }

    return client.connect()
    .then(function(){
        return testimonios.insertOne(nuevoTestimonio)
    })
    .then(function(result){
        return nuevoTestimonio
    })
}

async function eliminarTestimonio(id){
    return client.connect()
    .then(function(){
        return testimonios.deleteOne({ _id: new ObjectId(id) })
    })
}

export{
    obtenerTestimonio,
    agregarTestimonio,
    eliminarTestimonio
}