import yup from 'yup'

const proyectoSchema = yup.object().shape({
    name: yup.string().required('El nombre es requerido'),
    description: yup.string().required('La descripción es requerida.'),
    link: yup.string().url('Debe ser un link.').required('El link es requerido.'),
    img: yup.string().required('El link de la imagen es requerido.'),
    show: yup.string().required('El mostrar/ocultar es requerido.')
}).noUnknown();

export{
    proyectoSchema,
}

