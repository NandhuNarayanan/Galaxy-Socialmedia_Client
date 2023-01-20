import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setAdminCredentials } from '../../features/auth/adminSlice'
import './adminLogin.scss'

function AdminLogin() {

  const [admin, setAdmin] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const adminLoginSubmit = async(e)=> {
    e.preventDefault()
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin`,{
      email:admin,
      password
    }).then((response)=> {
      dispatch(setAdminCredentials(response.data))
      navigate('/adminHome')
    })
  }


  return (
    <div className='loginBG'>
      <form  onSubmit={adminLoginSubmit}>
        <div className="cover">
            <h1> <span>ADMIN</span>LOGIN</h1>
            <div className='userInput'>
            <span>User Name:</span>
            <input type="text" name='email' placeholder='username' value={admin} onChange={(e) => setAdmin(e.target.value) } />

            </div>
            <div className='userInput'>
            <span>Password:</span>
            <input type="password" name='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value) } />

            </div>

            <button className="login-btn" type='submit'>Login</button>
        </div>
        </form>
    </div>
  )
}

export default AdminLogin