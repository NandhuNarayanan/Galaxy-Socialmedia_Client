import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: 'auth' , 
    initialState:JSON.parse( localStorage.getItem('auth'))|| { newUser : null , token : null} ,
    reducers: {
        setCredentials: (state, action) => {
            const { newUser , accessToken } = action.payload
            localStorage.setItem('auth',JSON.stringify( {newUser,token:accessToken}))
            state.newUser = newUser
            state.token = accessToken
        },
        logOut: (state , action) => {
            localStorage.removeItem('auth')
            localStorage.removeItem('profileId')
            state.newUser = null
            state.token = null
        },
        setUser: (state, action) => {
            state.newUser = action.payload
        }
    },
})

export const { setCredentials , logOut ,setUser} = authSlice.actions;

export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.newUser
export const selectCurrentToken = (state) => state.auth.token