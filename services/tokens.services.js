import { MongoClient } from 'mongodb'

const client = new MongoClient('mongodb://127.0.0.1:27017')
const db = client.db('AH_P3')
const tokens = db.collection('Tokens')

async function crearToken(token){
    const tokenNvo = {...token}
    
    await client.connect()
    
    await tokens.insertOne(tokenNvo)

    return tokenNvo
}

async function buscarPorToken(token){
    await client.connect()

    return tokens.findOne({token})
}

async function eliminarPorToken(token){
    await client.connect()

    return tokens.deleteOne({token})
}

export{
    crearToken,
    buscarPorToken,
    eliminarPorToken
}