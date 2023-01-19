import React, { useContext, useState } from 'react'
import './adminsidebar.scss'
import Logo from '../../assets/image/logo_for_galaxy1.png'
import {UilSignOutAlt} from '@iconscout/react-unicons'; 

import { AdminSidebarData } from '../Data/Data'
import { pathChange } from '../../context/context';
import { adminlogOut } from '../../features/auth/adminSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AdminSidebar() {
const {path , setPath} = useContext(pathChange)
    const [selected, setSelected] = useState(0)

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleLogout = () => {
      dispatch(adminlogOut())
      navigate('/admin')
    }

  return (
    <div className="AdminSidebar">
    <div className="Logo">
      <img src={Logo} alt="" />
      <span>
        Ga<span>l</span>axy
      </span>
    </div>
    <div className="menu">
        {AdminSidebarData.map((item, index)=>{
            return(
                <div className={selected===index?'menuItem active':'menuItem'}
                key={index}
                onClick={()=>{setSelected(index);setPath(item.status)}}
                >
                    <item.icon/>
                    <span>
                        {item.heading}
                    </span>
                </div>
            )
        })}

        <div onClick={handleLogout} className="menuItem">
            <UilSignOutAlt/>
            Logout
        </div>
    </div>
    </div>
  )
}

export default AdminSidebar
