import React, { useEffect, useState } from 'react'
import './table.scss'
import DataTable from 'react-data-table-component'
import axios from 'axios'
import { border } from '@mui/system'

const activateButtonStyle = {
    backgroundColor: "green",
    color: "white",
    padding: 5,
    borderRadius: "6px",
    width: "60px",
    fontSize: "12PX",
    border: "0px ",
    cursor: "pointer",
}

const blockButtonStyle = {
  backgroundColor: "red",
  color: "white",
  padding: 5,
  borderRadius: "6px",
  width: "60px",
  fontSize: "12PX",
  border: "0px ",
  cursor: "pointer",
};

function Cards() {
  const [userData, setUserData] = useState([])

  const [search, setSearch] = useState('')

  const [filterUser, setFilterUser] = useState([])

  const [userBlock, setUserBlock] = useState()

  const getUsers = async () => {
    try {
      await axios
        .get('http://localhost:3001/admin/getUsers')
        .then((response) => {
          console.log(response)
          setUserData(response.data.allUsers)
          setFilterUser(response.data.allUsers)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const blockUser = async (userId) => {
    console.log(userId, 'userrrrrrrrriiiidddddd')
    try {
      await axios
        .patch('http://localhost:3001/admin/blockUser', {
          userId,
        })
        .then((response) => {
          console.log(response.data)
          setUserBlock(response.data.blockedUser)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const columns = [
    {
      name: 'No',
      selector: (row, index) => index + 1,
    },
    {
      name: 'User Name',
      selector: (row) => row.firstName,
      sortable: true,
    },
    {
      name: 'User Email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row) => (
        <button style={row.isBlocked? activateButtonStyle:blockButtonStyle } onClick={() => blockUser(row._id)}>
          {row.isBlocked ? 'Activate' : 'Block'}
        </button>
      ),
    },
  ]

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    const result = userData.filter((user) => {
      return user.firstName.toLowerCase().match(search.toLowerCase())
    })

    setFilterUser(result)
  }, [search])

  return (
    <div className="table">
      <DataTable
        title="User List"
        columns={columns}
        data={filterUser}
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
            onChange={(e) => setSearch(e.target.value)}
          />
        }
      />
    </div>
  )
}

export default Cards
