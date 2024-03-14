async function IniciarSesion(email, password){
    return fetch('http://localhost:2022/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
    .then(async (response) => {
        if(response.ok){
            return response.json()
        } else {
            throw await response.json()
        }
    })
}

async function Registro(usuario){
    return fetch('http://localhost:2022/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario)
    })
    .then( async (response) => {
        if(response.ok){
            return response.json()
        } else {
            throw await response.json()
        }
    })
}

async function CerrarSesion(){
    return fetch('http://localhost:2022/api/users/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        }
    })
    .then((response) => {
        if(response.ok){
            return response.json()
        } else {
            throw new Error('Ocurrió un error inesperado.')
        }
    })
}

export{
    IniciarSesion,
    Registro,
    CerrarSesion
}