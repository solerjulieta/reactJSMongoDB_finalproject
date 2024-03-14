import { MongoClient, ObjectId } from 'mongodb'
import fs from 'fs'

const client = new MongoClient('mongodb://127.0.0.1:27017')


async function importar(collectionName) {
    await client.connect()

    const db = client.db('AH_P3')

    const collection = db.collection(collectionName)
    const data = JSON.parse(fs.readFileSync(`./data/${collectionName}.json`))

    for (let i = 0; i < data.length; i++) {
        data[i]._id = new ObjectId(data[i]._id.$oid)
    }

    await collection.insertMany(data)

    client.close()
}

await importar('Projects')
await importar('Testimonials')
await importar ('Users')