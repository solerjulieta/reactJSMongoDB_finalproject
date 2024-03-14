import express, { response } from 'express'
import cors from 'cors'
import ProjectsApiRouter from './api/routes/projects.api.routes.js'
import UsersApiRouter from './api/routes/users.api.routes.js'

const app = express()
app.set('view engine', 'ejs')
app.use(cors())

app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(express.json())

//Rutas
app.use('/', ProjectsApiRouter)
app.use('/', UsersApiRouter)

app.listen(2022, function(){
    console.log('El servidor se está ejecutando')
})