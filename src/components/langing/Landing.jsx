import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './landing.css'
import astronaut from '../../assets/image/astronaut.png'
import Logo from '../../assets/image/logo_for_galaxy1.png'

function Landing() {

  const navigate = useNavigate()
  return (
    <div onClick={()=> navigate('/login')} className='main-div'>
    <div className="headerBar">
      <div  className="header-left">
        <h2>Galaxy.</h2>
      </div>
      <div className="header-right">
        <ul>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
    <div className="orange-main">
      <div className="transparent-text">
        <h1 className="transparent-text-heading">
          <span className="tt-span-one">GA</span>
          <span className="tt-span-two">LA</span>
        </h1>
      </div>
      <div className="orange-diag"></div>
      <div className="orange-subsec1">
        <h1 className="head-main">
          <span className="head-left">GA</span>
          <img className='astronaut' src={astronaut} alt="" />
          <span className='head-right' >AXY</span>
        </h1>
        <p > We are all stars in this galaxy. However alert we are, antiquity remains an unknown, unanticipated galaxy.</p>
      </div>
      
      <div  className="log">
        <h3  >→TO SIGNIN</h3>
      </div>
      <div className="o1">
        <img src={Logo} alt="" />
      </div>
    </div>
    </div>

  )
}

export default Landing