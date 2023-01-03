import { createSlice } from '@reduxjs/toolkit'

const profileSlice = createSlice({
  name: 'userProfile',
  initialState: {
    profileId: '',
  },
  reducers: {
    profileVisit: (state, action) => {
      state.profileId = action.payload;
    },
  },
})


export const { profileVisit } = profileSlice.actions
export default profileSlice.reducer