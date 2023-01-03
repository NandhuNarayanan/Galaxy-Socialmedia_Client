import { transform } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { TouchBallLoading } from 'react-loadingg'

import { useDispatch } from 'react-redux'
import { setCredentials } from '../../features/auth/authSlice'
import { useLoginMutation } from '../../features/auth/authApiSlice'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import axios from 'axios'
import imgLogo from '../../assets/image/logo_for_galaxy1.png'

const move = keyframes`
0%{
    opacity:0;
}
95%{
    opacity:1;
}
`

const BackgroundBox = styled.div`
  background-color: #beeefb;
  height: 70vh;
  width: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  margin: 15rem auto;

  position: relative;
  border-radius: 23px;
  border: 1px solid #053271;

  .text1 {
    z-index: ${(props) => (props.clicked ? '-700' : '700')};
    transform: ${(props) =>
      props.clicked ? 'translateX(0)' : 'translateX(95%)'};
    transition: transform 1s ease-in-out;
    animation: ${(props) => (props.clicked ? move : 'none')} 1.5s;
  }

  .text2 {
    z-index: ${(props) => (props.clicked ? '700' : '-700')};
    animation: ${(props) => (props.clicked ? 'none' : move)} 1.5s;

    transform: ${(props) =>
      props.clicked ? 'translateX(-80%)' : 'translateX(0%)'};

    transition: transform 1s ease-in-out;
  }

  .signin {
    position: absolute;
    top: 0%;
    text-align: center;
    z-index: ${(props) => (props.clicked ? '-600' : '500')};
    transform: ${(props) => (props.clicked ? 'none' : 'translateX(-50%)')};
    transition: all 1s;
  }

  .signup {
    position: absolute;
    top: 0%;
    text-align: center;
    z-index: ${(props) => (props.clicked ? '500' : '-500')};
    transform: ${(props) => (props.clicked ? 'translateX(50%)' : 'none')};
    transition: all 1s;
  }
`

const Box1 = styled.div`
background-color:#f1fdcd;
width:50%;
height:105%;
position:absolute;
left:0;
top:-10px;
border-radius:25px;

transform: ${(props) =>
  props.clicked ? 'translateX(90%)' : 'translateX(10%)'};

transition:transform 1s ;

&::after,
&::before {
    content:  "",
    position:absolute;
    width: 100%;
    height: 100%;
    background-color: #f1fdcd;

    z-index: -200;
}

&::before {
    top:4rem;
    border-radius:23px;
    border:4px solid #053271;
}

&::after {
    bottom:3rem;
    border-radius:23px 23px 0 0;
    border-top:4px solid #053271;
    border-right:4px solid #053271;
    border-left:4px solid #053271;
}

`

const Box2 = styled.div`
  background-color: #053271;
  width: 45%;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;

  z-index: 600;

  transform: ${(props) =>
    props.clicked ? 'translateX(-122%)' : 'translateX(0%)'};
  transition: transform 1s;

  border-radius: ${(props) =>
    props.clicked ? '23px 0 0 23px' : '0 23px 23px 0'};
`

const Form = styled.form`
  color: #1b1b1b;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 4rem;

  //z-index:100;
`

const Input = styled.input`
  background-color: #fff;
  border: none;
  border-bottom: 2px solid #053271;

  padding: 1rem 2rem;
  margin: 0.5rem 0;
  width: 100%;

  &:focus {
    outline: none;
    border: none;
    border: 2px solid #053271;
  }
`

const Button = styled.button`
  border-radius: 3px;
  padding: 1rem 3.5rem;
  margin-top: 1rem;
  border: 1px solid black;
  background-color: black;
  color: #fff;
  text-transform: uppercase;
  cursor: pointer;
  letter-spacing: 1px;

  box-shadow: 0 7px #999;

  &:hover {
    background-color: #1b1b1b;
  }

  &:active {
    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }
`

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 2rem;
`

const Link = styled.a`
  text-decoration: none;
  color: #333;
  font-size: 1.4rem;
  margin: 1rem 0;
`

const ButtonAnimate = styled.button`
  position: absolute;
  z-index: 1000;
  height: 5rem;
  width: 5rem;
  top: 70%;
  border: none;
  cursor: pointer;

  right: ${(props) => (props.clicked ? '52%' : '42%')};

  transform: ${(props) => (props.clicked ? 'rotate(360deg)' : 'rotate(0)')};

  transition: all 1.5s;

  background-color: transparent;

  &::before {
    content: '🔃';
    font-size: 4rem;
  }

  &:focus {
    outline: none;
  }
`

const Text = styled.div`
  position: absolute;
  z-index: 1000;
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  letter-spacing: 0.2rem;
  color: #fff;

  .attention {
    font-size: 2.5rem;
    position: relative;
    margin-top: 2rem;
  }

  .attention-icon {
    position: absolute;
    right: ${(props) => (props.clicked ? '0' : 'none')};
    top: 100%;
    font-size: 5rem;
  }
`

function FormComponent() {
  const userRef = useRef()
  const errRef = useRef()
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const navigate = useNavigate()

  const [login, { isLoading }] = useLoginMutation()
  const dispatch = useDispatch()

  useEffect(() => {
    setErrMsg('')
  }, [user, password])

  

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      axios.post('http://localhost:3001/login',
      {
       email:user,
       password
      }).then((response)=>{
         dispatch(setCredentials(response.data))
      setUser('')
      setPassword('')
      navigate('/home')

      })
     
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response')
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password')
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized')
      } else {
        setErrMsg('Login Failed')
      }
    }
  }

  const handleUserInput = (e) => setUser(e.target.value)
  const handlePasswordInput = (e) => setPassword(e.target.value)

  const [click, setClick] = useState(false)
  const handleClick = () => setClick(!click)

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  }

  const onSubmit = (values) => {
   axios.post('http://localhost:3001/signup',
   {
    values
   }).then((response)=> {
    navigate('/home')
    dispatch(setCredentials(response.data))
    dispatch(setCredentials(response.data.newUser))
   }).catch((error)=>{
    console.log(error);
   })
  }

  const validate = (values) => {
    let errors = {}

    if (!values.firstName) {
      errors.firstName = 'Firstname Required'
    }

    if (!values.lastName) {
      errors.lastName = 'Lastname Required'
    }

    if (!values.email) {
      errors.email = 'Email Required'
    } else if (
      !/^[A-Z0-9][A-Z0-9._%+-]{0,63}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(
        values.email,
      )
    ) {
      errors.email = 'Invalid email format'
    }

    if (!values.phone) {
      errors.phone = 'Phone number Required'
    }

    if (!values.password) {
      errors.password = 'Password Required'
    }
    return errors
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
    
  })
  return (
    <>
      {' '}
      {isLoading ? (
        <TouchBallLoading />
      ) : (
        <BackgroundBox clicked={click}>
          <ButtonAnimate clicked={click} onClick={handleClick}></ButtonAnimate>
          <Form onSubmit={handleSubmit} className="signin">
            <Title>Sign In</Title>
            <Input
              type="email"
              name="email"
              id="emailId"
              placeholder="Email"
              onChange={handleUserInput}
              value={user}
            />
            <Input
              type="password"
              name="password"
              id="passwordId"
              placeholder="Password"
              onChange={handlePasswordInput}
              value={password}
              required
            />
            <Link href="#">Forgot Your Password?</Link>
            <Button>Sign In</Button>
          </Form>

          <Form className="signup" onSubmit={formik.handleSubmit}>
            <Title>Sign Up</Title>
            <div className="form-control">
              <Input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name"
                onChange={formik.handleChange}
                value={formik.values.firstName}
                onBlur={formik.handleBlur}
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div className="error">{formik.errors.firstName}</div>
              ) : null}
            </div>
            <div className="form-control">
              <Input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                onChange={formik.handleChange}
                value={formik.values.lastName}
                onBlur={formik.handleBlur}
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <div className="error">{formik.errors.lastName}</div>
              ) : null}
            </div>
            <div className="form-control">
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="form-control">
              <Input
                type="number"
                name="phone"
                id="phonenumber"
                placeholder="Phone Number"
                onChange={formik.handleChange}
                value={formik.values.phone}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phone && formik.errors.phone ? (
                <div className="error">{formik.errors.phone}</div>
              ) : null}
            </div>
            <div className="form-control">
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="error">{formik.errors.password}</div>
              ) : null}
            </div>
            <Link href="#" onClick={handleClick}>
              Already have an Account
            </Link>
            <Button type="submit">Sign Up</Button>
          </Form>

          <Text className="text1" clicked={click}>
            <div className='logo' style={{marginBottom:'30px',fontSize:'32px'}}>
            <h3><img style={{width:'60px',height:'60px'}} src={imgLogo} alt="" />Galaxy</h3>
            </div>
            
            <h1>Welcome!</h1>
            Don't have an account ?
            <br />
            <span className="attention">Click on Emoji</span>
            <span className="attention-icon">↲ </span>
          </Text>

          <Text className="text2" clicked={click}>
          <div className='logo' style={{marginBottom:'30px',fontSize:'32px'}}>
            <h3><img style={{width:'60px',height:'60px'}} src={imgLogo} alt="" />Galaxy</h3>
            </div>
            <h1>Hi There!</h1>
            Already have an account ?
            <br />
            <span className="attention">Click on Emoji</span>
            <span className="attention-icon">↳</span>
          </Text>

          <Box1 clicked={click} />
          <Box2 clicked={click} />
        </BackgroundBox>
      )}
    </>
  )
}

export default FormComponent
