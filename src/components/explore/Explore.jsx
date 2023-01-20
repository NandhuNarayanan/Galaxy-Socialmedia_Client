import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './explore.scss'
import { Masonry } from '@mui/lab'

function Explore() {
    const [explore, setExplore] = useState([])

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/post/getpost`).then((response)=>{
            setExplore(response.data)
        })
    },[])

  return (
    <div className='explore'>
      {true && <Masonry columns={{ xs: 2, lg: 3 }} spacing={2} >
         {explore.map(post=>(
                    <img src={post.image[0]} key={post._id} alt="" />

        ))}
        </Masonry>}
    </div>
  )
}

export default Explore