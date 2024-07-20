import * as Yup from 'yup'

const SignupSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string()
        .required('Required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
})

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string()
        .required('Required')
})

const SendEmailSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Required')
})

const GeneralFormSchema = Yup.object().shape({
    name: Yup.string()
        .required('Required'),
    DoB: Yup.string()
        .required('Required'),
    gender: Yup.string()
        .required('Required'),
})

const ParentFormSchema = Yup.object().shape({
    invitationCode: Yup.string()
        .matches(/^[0-9]{6}$/, 'Invalid OTP')
        .required('Required'),
})

const StudentFormSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string()
        .required('Required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), undefined], 'Passwords must match'),

    name: Yup.string()
        .required('Required'),
    DoB: Yup.string()
        .required('Required'),
    gender: Yup.string()
        .required('Required'),
    teacher: Yup.string()
        .required('Required'),
    instrument: Yup.string()
        .required('Required'),
})

export {
    SignupSchema,
    LoginSchema,
    SendEmailSchema,
    GeneralFormSchema,
    ParentFormSchema,
    StudentFormSchema
}