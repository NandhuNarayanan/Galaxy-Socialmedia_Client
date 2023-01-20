import axios from "axios";

const API = axios.create({baseURL: 'http://galaxy.kingsteruniversity.site'})

export const userChats = (id) => API.get(`/chat/${id}`)

export const getUser = (userId) => API.get(`/getUsers/${userId}`)