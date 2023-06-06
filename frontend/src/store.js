import { configureStore } from '@reduxjs/toolkit'
import brainSlice from './stores/brainSlice'
import themeSlice from './stores/themeSlice'

export default configureStore({
  reducer: {
    brain: brainSlice,
    theme: themeSlice
  },
})