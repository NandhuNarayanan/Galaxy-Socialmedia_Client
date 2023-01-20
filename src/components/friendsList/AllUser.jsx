import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Suggestion from './Suggestion'

function AllUser() {
  const [allUser, setAllUser] = useState([])
  const loginUser = useSelector(state => state.auth.newUser._id)
  const {token} = useSelector(state=>state.auth)


  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/getAllUsers/${loginUser}`,{headers:{authorization:`bearer ${token}`}}).then((response)=>{
        setAllUser(response.data)
    })
},[])
  return (
    <>
    {allUser ?.length < 1 ? <h3>No One here</h3> : null}
        {allUser.map((user)=>(
            <Suggestion user={user} key={user.id}/>
        ))}
    </>
  )
}

export default AllUser