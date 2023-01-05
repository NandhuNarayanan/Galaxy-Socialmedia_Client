import React from 'react'
import './explore.scss'

function ExploreGallery({ post }) {
  return (
      <div >
        <img src={post?.image[0]} alt="" />

      </div>
  );
}

export default ExploreGallery


{/* <Masonry columns={3} spacing={2}>
        {posts.map((item, index) => (
          <div key={index}>
            <img
              src={`${item.img}?w=162&auto=format`}
              srcSet={`${item.img}?w=162&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
              style={{
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4,
                display: 'block',
                width: '100%',
              }}
            />
          </div>
        ))}
      </Masonry> */}