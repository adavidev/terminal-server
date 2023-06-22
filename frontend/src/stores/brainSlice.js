import { createSlice } from '@reduxjs/toolkit'

export const brainSlice = createSlice({
  name: 'brain',
  initialState: {
    memory: {
      page: 0,
      cue: 0,
      triggerAction: false,
    },
    pages: null,
    cues: [],
    config: null,
  },
  reducers: {
    setMemory: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.memory = {...state.memory, ...action.payload}
    },
    fetchPages: (state, action) => {
      console.log('Running: ', action.payload)
      const content = JSON.parse(action.payload.config)
      state.pages = content.pages
      state.config = content.config
    },
    addCues: (state, action) => {
      console.log(action.payload)
      state.cues.push(action.payload)
    }
  },
})

// Action creators are generated for each case reducer function
export const { setMemory, fetchPages, addCues } = brainSlice.actions

export default brainSlice.reducer