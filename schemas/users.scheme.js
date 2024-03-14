import yup from 'yup';

const usuarioSchema = yup.object().shape({
    name: yup.string().required('El nombre es requerido'),
    email: yup.string().email('El email ingresado no es válido.').required('El email es requerido'),
    password: yup.string().min(6, 'La contraseña debe contener al menos seis caracteres.').required('La contraseña es requerida')
}).noUnknown()

const iniciarSesionSchema = yup.object({
    email: yup.string().email('El email ingresado no es válido.').required('El email es requerido'),
    password: yup.string().required('La contraseña es requerida')
}).noUnknown()

export{
    usuarioSchema,
    iniciarSesionSchema
}