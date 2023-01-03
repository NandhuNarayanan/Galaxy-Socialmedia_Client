import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Suggestion from './Suggestion'

function AllUser() {
  const [allUser, setAllUser] = useState([])
  const loginUser = useSelector(state => state.auth.newUser._id)

  useEffect(()=>{
    axios.get(`http://localhost:3001/getAllUsers/${loginUser}`).then((response)=>{
        setAllUser(response.data)
    })
},[])
  return (
    <>
        {allUser.map((user)=>(
            <Suggestion user={user} key={user.id}/>
        ))}
    </>
  )
}

export default AllUser