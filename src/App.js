import {  Outlet, createBrowserRouter, RouterProvider, useNavigate, Navigate } from 'react-router-dom'
import './App.css'
import FormComponent from './components/Login&Signup/FormComponent'
import Home from './pages/home/Home'
import Profile from './pages/profile/Profile'
import Leftbar from './components/leftBar/LeftBar'
import Rightbar from './components/rightBar/Rightbar'
import './style.scss'
import { useContext } from 'react'
import { DarkModeContext } from './context/darkModeContext'
import RequireAuth from './features/auth/RequireAuth'
import Landing from './components/Landing'
import { useSelector } from 'react-redux'
import Explore from './components/explore/Explore'

function App() {
const auth = useSelector(state =>state.auth)


  const currentUser =auth.token;

  const { darkMode } = useContext(DarkModeContext)



  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? 'dark' : 'light'}`}>
        <div style={{ display: 'flex' }}>
          <Leftbar />
          <div style={{ flex: 6 }}>
          <Outlet/>
          </div>
          <Rightbar />
        </div>
      </div>
    )
  }

const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to='/login' />
    }
    return children
  };
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Landing />
    },
    {
      path: '/',
      element: <ProtectedRoute><Layout /></ProtectedRoute>,
      children: [
        {
          path: '/home',
          element: <Home />
        },
        {
          path: '/profile/:id',
          element: <Profile />
        },
      ]
    },
    {
      path: '/login',
      element: <FormComponent />
    },
     {
      path: '/explore',
      element: <Explore />
    },
  ])
  return (
    <div className="App">
     <RouterProvider router={router}/>
    </div>
  )
}

export default App
