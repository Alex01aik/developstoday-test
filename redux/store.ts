import { reducer as formReducer } from 'redux-form'
import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './postReducer'

const store = configureStore({
  reducer: {
    post: postsReducer,
    form: formReducer
  }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
