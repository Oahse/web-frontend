import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {thunk } from 'redux-thunk'
// import { composeWithDevTools } from "@redux-devtools/extension"; 

const reducer = combineReducers({})

const initialState = {} 

const middleware = [thunk]

const store = configureStore({
    reducer: reducer, 
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
    // composeWithDevTools(applyMiddleware(...middleware))
}) 

export default store 