import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice'
import appReducer from './slices/appSlice'
import curationReducer from './slices/curationSlice'

export const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    curation: curationReducer
  }
})