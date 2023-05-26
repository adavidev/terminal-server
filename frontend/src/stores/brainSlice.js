import { configureStore,createSlice } from '@reduxjs/toolkit'
import sample from '../sample.json'

export const brainSlice = createSlice({
  name: 'brain',
  initialState: {
    memory: {
      page: 0,
      pages: sample.pages

    },
  },
  reducers: {
    setMemory: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.memory = {...state.memory, ...action.payload}
    },
  },
})

// Action creators are generated for each case reducer function
export const { setMemory } = brainSlice.actions

export default brainSlice.reducer