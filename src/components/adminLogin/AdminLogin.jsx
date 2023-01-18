import React, { useState } from 'react'
import './adminLogin.scss'

function AdminLogin() {


  const [admin, setAdmin] = useState('')
  const [password, setPassword] = useState('')




  return (
    <div className='loginBG'>
      <form >
        <div className="cover">
            <h1> <span>ADMIN</span>LOGIN</h1>
            <div className='userInput'>
            <span>User Name:</span>
            <input type="text" name='email' placeholder='username' value={admin} />

            </div>
            <div className='userInput'>
            <span>Password:</span>
            <input type="password" name='password' placeholder='password' value={password} />

            </div>

            <div className="login-btn" type='submit'>Login</div>
        </div>
        </form>
    </div>
  )
}

export default AdminLogin