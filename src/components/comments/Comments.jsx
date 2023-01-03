import React from 'react'
import CommentComponents from './CommentsComponents'

function Comments({postId}) {
  return (
    <div className='comments'>
        <CommentComponents postId={postId}/>
    </div>
  )
}

export default Comments