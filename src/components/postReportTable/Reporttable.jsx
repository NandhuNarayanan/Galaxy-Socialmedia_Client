import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axios from 'axios'
import { border } from '@mui/system'

const removeButton = {
  backgroundColor: "red",
    color: "white",
    padding: 5,
    borderRadius: "6px",
    width: "60px",
    fontSize: "12PX",
    border: "0px ",
    cursor: "pointer",
}
const DeclineButton = {
  backgroundColor: "grey",
  color: "white",
  padding: 5,
  borderRadius: "6px",
  width: "60px",
  fontSize: "12PX",
  border: "0px ",
  cursor: "pointer",
  }

function Cards() {
  const [postData, setPostData] = useState([])
  
  const [search, setSearch] = useState('')

  const [filterPost, setFilterPost] = useState([])
  


  const getReportPost = async () => {
    try {
      await axios
        .get('http://galaxy.kingsteruniversity.site/admin/reportPost')
        .then((response) => {
          console.log(response)
          setPostData(response.data.reportedPosts)
          setFilterPost(response.data.reportedPosts)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const removePost = (async(postId)=>{
    console.log(postId);
    try {
      await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/admin/removePost`,{
        postId
      })
    } catch (error) {
      console.log(error);
    }
  })

  const declinePost = (async(postId)=>{
    console.log(postId);
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/declinePost`,{
        postId
      })
    } catch (error) {
      console.log(error);
    }
  })

  const columns = [
    {
      name: 'No',
      selector: (row, index) => index + 1,
    },
    {
        name: 'Image',
        selector: (row) => <img width={100} height={80} src={row.postId.image}/>,
      },
    {
      name: 'Posted By',
      selector: (row) => row.postId.userId.firstName,
      sortable: true,
    },
    {
      name: 'Posted Date',
      selector: (row) => row.postId.createdAt.slice(0, 10),
      sortable: true,
    },
    {
        name: 'Reasons',
        selector: (row) => row.reports
      },
    {
      name: 'Remove Post',
      cell: (row) => <button style={removeButton} onClick={()=> removePost(row.postId._id)}>remove</button>,
    },
    {
        name: 'Decline Request',
        cell: (row) => <button style={DeclineButton} onClick={()=> declinePost(row.postId._id)}>Decline</button>,
      },
  ]
  console.log(postData,'aseadsafsdwscsweadcas')

  useEffect(() => {
    getReportPost()
  }, [])

  useEffect(()=>{
 const result = postData.filter(user => {
  return user.postId.userId.firstName.toLowerCase().match(search.toLowerCase())
 });

 setFilterPost(result)
  },[search]);

  return (
    <div className="table">
      <DataTable
        title="Report List"
        columns={columns}
        data={filterPost}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="450px"
        highlightOnHover
        subHeader
        subHeaderComponent={
          <input
            type="text"
            placeholder="Search Here"
            className="form-control"
            value={search}
            onChange={(e)=> setSearch(e.target.value)}
          />
        }
      />
    </div>
  )
}

export default Cards
