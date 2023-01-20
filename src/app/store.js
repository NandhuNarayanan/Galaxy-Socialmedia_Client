import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from '../features/auth/authSlice';
import profileReducer from '../features/pofileSlice';
import postReducer from '../features/postSlice';
import adminReducer from '../features/auth/adminSlice';
import refreshReducer from '../features/auth/RefreshSlice'



export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath] : apiSlice.reducer,
        auth: authReducer,
        profileId:profileReducer,
        post:postReducer,
        admin:adminReducer,
        refresh:refreshReducer,
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
})