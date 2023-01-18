import React, { useContext } from 'react'
import Cards from '../table/Table'
import './userManagement.scss'
import Reporttable from '../postReportTable/Reporttable'
import { pathChange } from '../../context/context'

function AdminDash() {

  const {path, setPath} = useContext(pathChange)

  return (
    <div className='adminDash'>
       {path?<>
       <h1>User Management</h1>
        <Cards/>
       </>
       :
       <>
        <h1>Reported Posts</h1>
        <Reporttable/>
       </>}
    </div>
  )
}

export default AdminDash