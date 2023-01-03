import { createSlice } from '@reduxjs/toolkit'

const postSlice = createSlice({
  name: 'userPost',
  initialState: {
    post: '',
  },
  reducers: {
    postShow: (state, action) => {
        console.log(action);
      state.post = action.payload;
    },
  },
})


export const { postShow } = postSlice.actions
export default postSlice.reducer