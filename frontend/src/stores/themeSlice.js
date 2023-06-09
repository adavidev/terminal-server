import { createSlice } from '@reduxjs/toolkit'

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    color: "#a9fe9d",
    backgroundColor: "#0f1c0d",
    alertColor: "red",
    font: 'SnesFont'
  },
  reducers: {
    setColor: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.color = action.payload
      state.backgroundColor = action.payload
    },
    setBackgroundColor: (state, action) => {
      state.backgroundColor = action.payload
    },
    setFont: (state, action) => {
      state.font = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setColor, setBackgroundColor, setFont } = themeSlice.actions

export default themeSlice.reducer


// color: "#a9fe9d",
// backgroundColor: "#0f1c0d",

// "color": "#b1b871",
// "backgroundColor": "#1a1c0d"