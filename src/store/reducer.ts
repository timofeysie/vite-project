import { combineReducers } from '@reduxjs/toolkit'
import appSliceReducer from "../appSlice"

const rootReducer = combineReducers({
    appSlice: appSliceReducer,
})
export type RootState = ReturnType<typeof rootReducer>