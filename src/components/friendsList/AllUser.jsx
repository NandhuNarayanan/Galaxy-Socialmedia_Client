import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Suggestion from './Suggestion'

function AllUser() {
  const [allUser, setAllUser] = useState([])

  useEffect(()=>{
    axios.get('http://localhost:3001/getAllUsers').then((response)=>{
      console.log(response,'getAllUsers');
        setAllUser(response.data)
    })
},[])
  return (
    <div>
      <div className='user'>
        {allUser.map((user)=>(
            <Suggestion user={user} key={user.id}/>
        ))}
    </div>
    </div>
  )
}

export default AllUser