import React from 'react'
import { Link } from 'react-router-dom'

function Landing() {
  return (
    <>
    <h1>Landing</h1>
    <footer>
        <Link to="/login">Go to Login</Link>
    </footer>
    </>
  )
}

export default Landing