import { createSlice } from '@reduxjs/toolkit'



export const homeSlice = createSlice({
  name: 'home',
  initialState : {
    url:{},
    genre:{},
  },
  reducers: {
    getApiConfiguration : (state,action) => {
        state.url = action.payload
    },
    getGenres : (state,action) => {
        state.genre = action.payload
    }
  },
})

export const { getApiConfiguration, getGenres } = homeSlice.actions

export default homeSlice.reducer