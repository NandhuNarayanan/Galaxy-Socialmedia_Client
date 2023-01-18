 import React, { useState } from 'react'
import AdminDash from '../../components/userManagement/UserManagement'
import AdminSidebar from '../../components/adminSidebar/AdminSidebar'
 import './adminHome.scss'
 import {pathChange} from '../../context/context'
 function AdminHome() {
  const [path, setPath] = useState(true)
   return (
     <div className='AppGlass'>
       <div className="AppContainer">
        <pathChange.Provider value={{path,setPath}}>
        <AdminSidebar/>
        <AdminDash/>
        </pathChange.Provider>
       </div>
     </div>
   )
 }
 
 export default AdminHome