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
import Landing from './components/langing/Landing'
import { useSelector } from 'react-redux'
import Explore from './components/explore/Explore'
import Chat from './pages/chat/Chat'
import AdminHome from './pages/admin/AdminHome'
import AdminLogin from './components/adminLogin/AdminLogin'



function App() {
const auth = useSelector(state =>state.auth)

const admin = useSelector(state =>state.admin)

console.log(auth,'auth');


  const currentUser =auth.token;

  const currentAdmin =admin.token;

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

  const Layout1 = () => {
    return (
      <div className={`theme-${darkMode ? 'dark' : 'light'}`}>
        <div style={{ display: 'flex' }}>
          <Leftbar />
          <div style={{ flex: 6 }}>
          <Outlet/>
          </div>
        </div>
      </div>
    )
  }

  const Layout2 = () => {
    return (
      <div className={`theme-${darkMode ? 'dark' : 'light'}`}>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 6 }}>
          <Outlet/>
          </div>
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
  const ProtectedRoute1 = ({ children }) => {
    if (!currentUser) {
      return <Navigate to='/login' />
    }
    return children
  };
  const ProtectedRoute2 = ({ children }) => {
    if (!currentAdmin) {
      return <Navigate to='/admin' />
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
        {
          path: '/explore',
          element: <Explore />
        },
      ]
    },
    {
      path: '/login',
      element: <FormComponent />
    },
    {
      path:'/',
      element:<ProtectedRoute1><Layout1/></ProtectedRoute1>,
      children:[
        {
          path: '/chat',
          element: <Chat />
        },
      ]
    },
    {
      path:'/',
      element:<ProtectedRoute2><Layout2/></ProtectedRoute2>,
      children:[
        {
          path: '/adminHome',
          element: <AdminHome />
        },
      ]
    },
    {
      path: '/admin',
      element: <AdminLogin />
    },
   
     
  ])
  return (
    <div className="App">
      
     <RouterProvider router={router}/>
    </div>
  )
}

export default App
