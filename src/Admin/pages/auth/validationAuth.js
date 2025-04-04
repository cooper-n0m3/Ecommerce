import * as Yup from 'yup'



export const validationAuth= Yup.object({
    email:
        Yup.string().email('Invalid email address!').required('Email is required!'),
    password:
        Yup.string().required('Password is required!')

})
export const RegisterValidation = Yup.object({
    email: 
        Yup.string().email('Invalid email address').required('Email field is required!'),
    password:
        Yup.string().min(7,'Password at least 10 characters').required('Password is required!'),
    name:
        Yup.string().required('Username field is required'),
    phone:
        Yup.string().required('Phone Number is required'),
    secretKey:
        Yup.string().required('Secret-Key is required'),
})