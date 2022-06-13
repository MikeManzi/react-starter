import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext';

function Login() {
  const { login, error, isLoading, user } = useContext(AuthContext);
  if (error) {
    console.log(error)
  }
  const [values, setValues] = useState({
    email: '',
    password: '',
  })

  const [touched, setTouched] = useState({
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
    await login(values.email, values.password)
  }


  const isValidEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  const isValidPassword = (password) => {
    return password.length >= 8
  }

  const emailErrorMessage = (email) => {
    if (!email) {
      return 'Email is required'
    } else if (!isValidEmail(email)) {
      return 'Email is invalid'
    } else {
      return ''
    }
  }

  const passwordErrorMessage = (password) => {
    if (!password) {
      return 'Password is required'
    } else if (!isValidPassword(password)) {
      return 'Password must be at least 8 characters'
    } else {
      return ''
    }
  }


  const isValid = touched.email && touched.password && isValidEmail(values.email) && isValidPassword(values.password)

  const errors = {
    email: touched.email ? emailErrorMessage(values.email) : "",
    password: touched.password ? passwordErrorMessage(values.password) : "",
  }

  if(user?.token){
    return <Navigate replace to="/home" />
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="email" name='email' placeholder="Email" value={values.email} onChange={handleChange} onFocus={handleFocus} />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <input type="password" name='password' placeholder="Password" value={values.password} onChange={handleChange} onFocus={handleFocus} />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <button type="submit" disabled={!isValid || isLoading}>{isLoading ? "Wait..." : "Login"}</button>

        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </form>
    </div>
  )
}

export default Login