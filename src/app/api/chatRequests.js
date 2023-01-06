import axios from "axios";

const API = axios.create({baseURL: 'http://localhost:3001'})

export const userChats = (id) => API.get(`/chat/${id}`)

export const getUser = (userId) => API.get(`/getUsers/${userId}`)