import { configureStore } from '@reduxjs/toolkit'
import brainSlice from './stores/brainSlice'

export default configureStore({
  reducer: {
    brain: brainSlice
  },
})