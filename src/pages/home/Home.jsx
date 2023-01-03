import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../features/auth/authSlice'
import Posts from '../../components/posts/Posts';
import Stories from '../../components/stories/Stories';
import './home.scss';

function Home() {


  return (
    <div className='home'>
     <Stories/>
     <Posts/>
    </div>
  )
}

export default Home
