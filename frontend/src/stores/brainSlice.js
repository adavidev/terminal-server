import { createSlice } from '@reduxjs/toolkit'

export const brainSlice = createSlice({
  name: 'brain',
  initialState: {
    memory: {
      page: 0,
      dialog: '',
    },
    pages: null,
    config: null,
    dialogs: null
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
      state.pages = content.pages.filter((page) => {
        return page.type == "screen"
      })
      state.dialogs = content.pages.filter((page) => {
        return page.type == "dialog"
      })
      state.config = content.config
    }
  },
})

// Action creators are generated for each case reducer function
export const { setMemory, fetchPages } = brainSlice.actions

export default brainSlice.reducer