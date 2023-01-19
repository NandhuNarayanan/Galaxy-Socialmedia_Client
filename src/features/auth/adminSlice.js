import { createSlice } from "@reduxjs/toolkit";


const adminSlice = createSlice({
    name: 'admin' , 
    initialState:JSON.parse( localStorage.getItem('admin'))|| { token : null} ,
    reducers: {
        setAdminCredentials: (state, action) => {
            const { accessToken } = action.payload
            localStorage.setItem('admin',JSON.stringify( {token:accessToken}))
            state.token = accessToken
        },
        adminlogOut: (state , action) => {
            localStorage.removeItem('admin')
            state.token = null
        }
    },
})

export const { setAdminCredentials , adminlogOut } = adminSlice.actions;

export default adminSlice.reducer

export const selectAdminCurrentToken = (state) => state.admin.token