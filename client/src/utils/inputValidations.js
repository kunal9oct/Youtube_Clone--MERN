export const name_validation = {
    name: 'name',
    label: 'Name',
    type: 'text',
    id: 'name',
    placeholder: 'Enter your good name',
    validation: {
        required: {
            value: true,
            message: 'required',
        },
        maxLength: {
            value: 30,
            message: '30 characters max',
        },
    },
}

export const password_validation = {
    name: 'password',
    label: 'Password',
    type: 'password',
    id: 'password',
    placeholder: 'Enter your password',
    validation: {
        required: {
            value: true,
            message: 'required',
        },
        minLength: {
            value: 7,
            message: 'Password must be at least 7 characters.',
        },
    },
}

export const email_validation = {
    name: 'email',
    label: 'Email',
    type: 'email',
    id: 'email',
    placeholder: 'Enter your email',
    validation: {
        required: {
            value: true,
            message: 'required',
        },
        pattern: {
            value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: 'Invalid email',
        },
    },
}
