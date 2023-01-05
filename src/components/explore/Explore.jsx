import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ExploreGallery from './ExploreGallery'
import './explore.scss'
import { Masonry } from '@mui/lab'

function Explore() {
    const [explore, setExplore] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:3001/post/getpost').then((response)=>{
            console.log(response.data);
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