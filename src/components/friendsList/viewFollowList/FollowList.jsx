// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import Viewfollowing from './Viewfollowing'

// function FollowList({userFollowing}) {
// console.log(userFollowing,"/////");
//     // const [userList , setUserList] = useState([])
//     const user = useSelector(state => state.auth.newUser)

//     // useEffect(()=>{
//     //     axios.get(`http://localhost:3001/profile/userList/${id}`).then((response)=>{
//     //         console.log(response,'userlist')
//     //         setUserList(response.data.followingList)

//     //     }).catch((e)=>console.log(e,"o"))
//     // },[])
//   return (
//     <div>
//         {/* {userList.map((userFollowing)=>(
//             <Viewfollowing userFollowing={userFollowing}/>
//         ))}
//         {userList.map((userFollowers)=>(
//             <Viewfollowing userFollowers={userFollowers}/>
//         ))} */}
//         <div className='followHeader'>
//             <h2>Followers</h2>
//             <XboxX onClick={()=> close(false)}/>
//             </div>
//         <div className="followUser">
//       <div className="followUserInfo">
//         <img
//         //   src={user.profilePicture}
//           alt=""
//         />
//         <span>ssssss</span>
//       </div>
//       <div className="followButtons">
//        <FollowButton/>
//       </div>
//     </div>
//     </div>
//   )
// }

// export default FollowList