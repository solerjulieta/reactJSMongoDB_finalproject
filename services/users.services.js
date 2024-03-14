import { MongoClient, ObjectId } from 'mongodb'
import bcrypt from 'bcrypt'

const client = new MongoClient('mongodb://127.0.0.1:27017')
const db = client.db('AH_P3')
const usuarios = db.collection('Users')

async function traerUsuarios(filtro){
    return client.connect()
        .then(function(){
            return usuarios.find(filtro).toArray()
        })
}

async function agregarUsuario(usuario){
    const nuevoUsuario = {
        ...usuario
    }

    await client.connect()

    if(await usuarios.findOne({ email: nuevoUsuario.email })){ 
        throw new Error('El mail ya se encuentra registrado')
    }
    
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(nuevoUsuario.password, salt)

    nuevoUsuario.password = passwordHash

    await usuarios.insertOne(nuevoUsuario)

    return nuevoUsuario
}

async function eliminarUsuario(id){
    return client.connect()
    .then(function(){
        return usuarios.deleteOne({ _id: new ObjectId(id) })
    })
}

async function iniciarSesion(usuario){
    await client.connect()

    const usuarioEncontrado = await usuarios.findOne({ email: usuario.email })
    if(!usuarioEncontrado){
        throw new Error('El usuario ingresado no existe.')
    }

    const comparaPassword = await bcrypt.compare(usuario.password, usuarioEncontrado.password)
    if(!comparaPassword){
        throw new Error('La contraseña es incorrecta.')
    }

    return usuarioEncontrado
}

export{
    traerUsuarios,
    agregarUsuario,
    eliminarUsuario,
    iniciarSesion
}