import { proyectoSchema } from "../schemas/projects.scheme.js";

function proyectoValido(req, res, next){
    proyectoSchema.validate(req.body, { abortEarly: false })
    .then((data)=>{
        req.body = data;
        next()
    })
    .catch((error) => {
        res.status(400).json({ errors: error.errors })
    })
}

export { 
    proyectoValido
}