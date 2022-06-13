import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext';

function Register() {

    const { register, error, isLoading, user } = useContext(AuthContext);
    if (error) {
        console.log(error)
    }


    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    })

    const [touched, setTouched] = useState({
        firstName: false,
        lastName: false,
        email: false,
        password: false,
    })

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        })
    }

    const handleFocus = (event) => {
        setTouched({
            ...touched,
            [event.target.name]: true,
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        await register(values.firstName, values.lastName, values.email, values.password)
    }

    if (user) {
        return <Navigate replace to="/" />
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" name='firstName' placeholder="First Name" onChange={handleChange} />
                    {/* {errors.email && <p>{errors.email}</p>} */}
                </div>
                <div>
                    <input type="text" name='lastName' placeholder="Last Name" onChange={handleChange} />
                    {/* {errors.email && <p>{errors.email}</p>} */}
                </div>
                <div>
                    <input type="email" name='email' placeholder="Email" onChange={handleChange} />
                    {/* {errors.email && <p>{errors.email}</p>} */}
                </div>
                <div>
                    <input type="password" name='password' placeholder="Password" onChange={handleChange} />
                    {/* {errors.password && <p>{errors.password}</p>} */}
                </div>
                <button type="submit">Register</button>

                <p>Already have an account? <Link to="/">Login</Link></p>
            </form>
        </div>
    )
}

export default Register