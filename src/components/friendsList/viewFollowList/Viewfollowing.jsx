// import React from 'react'
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
// import AllUser from '../AllUser';
// import './viewFollowers.scss'
// import FollowButton from '../../followComponents/FollowButton';
// import { useSelector } from 'react-redux';
// import { XboxX } from 'tabler-icons-react';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

// function Viewfollowing({open,close,userFollowing}) {
//   console.log(userFollowing,'userfolloowidjsdsa');
// const user = useSelector(state => state.auth.newUser)

//   return (
//     <div>
//          <Modal
//         open={open}
//         onClose={()=>close(false)}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//             <div className='followHeader'>
//             <h2>Following</h2>
//  <XboxX onClick={()=>close(false)} />
//             </div>
//         <div className="followUser">
//       <div className="followUserInfo">
//         <img
//           src={userFollowing?.profilePicture?userFollowing.profilePicture:"https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"}
//           alt=""
//         />
//         <span>{userFollowing?.firstName}</span>
//       </div>
//       <div className="followButtons">
//         <FollowButton/>
//       </div>
//     </div>
//         </Box>
//       </Modal>
//     </div>
//   )
// }

// export default Viewfollowing
