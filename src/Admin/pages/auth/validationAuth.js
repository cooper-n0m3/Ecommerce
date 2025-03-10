import * as Yup from 'yup'



export const validationAuth= Yup.object({
    email:
        Yup.string().email('Invalid email address!').required('Email is required!'),
    password:
        Yup.string().min(7,'Password at least 10 characters').required('Password is required!')

})