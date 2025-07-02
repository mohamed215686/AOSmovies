import { configureStore } from '@reduxjs/toolkit'
import AOSmoviesReducer from './AOSmoviesSlice'

export const store = configureStore({
  reducer: {
    AOSmoviesData : AOSmoviesReducer 
  },
})