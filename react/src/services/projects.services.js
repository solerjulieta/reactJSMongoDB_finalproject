async function VerTodos(){
    return fetch('http://localhost:2022/api/projects')
    .then(response => response.json())
}

async function VerPublicos(){
    return fetch('http://localhost:2022/api/projects?show=true')
    .then(response => response.json())
}

async function ObtenerPorId(id){
    return fetch(`http://localhost:2022/api/projects/${id}`)
        .then(response => response.json())
}

async function VerTestimonios(id){
    return fetch(`http://localhost:2022/api/projects/${id}/testimonials`)
        .then(response => response.json())
}

async function Crear(proyecto){
    return fetch('http://localhost:2022/api/projects', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify(proyecto)
    })
    .then( async (response) => {
        if(response.ok){
            return response.json()
        }
        else{
            throw await response.json()
        }
    })
}

async function EliminarProyecto(id){
    return fetch(`http://localhost:2022/api/projects/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        }
    })
    .then(response => {
        if(response.ok){
            return response.json()
        }
        else{
            throw new Error('Ocurrió un error inesperado.')
        }
    })
}

async function EditarProyecto(id, proyecto){
    return fetch(`http://localhost:2022/api/projects/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify(proyecto),
    })
    .then(response => response.json())
}

export {
    VerTodos,
    VerPublicos,
    ObtenerPorId,
    VerTestimonios,
    Crear,
    EditarProyecto,
    EliminarProyecto,
}