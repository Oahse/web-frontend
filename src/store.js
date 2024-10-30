import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {thunk } from 'redux-thunk'
// import { composeWithDevTools } from "@redux-devtools/extension"; 
import { 
    userLoginReducer, 
    userRegisterReducer, 
    userDetailsReducer, 
    userUpdateProfileReducer, 
    userListReducer, 
    userDeleteReducer, 
    userUpdateReducer,
 } from './reducers/userReducers'

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate : userUpdateReducer,

})

const initialState = {} 

const middleware = [thunk]

const store = configureStore({
    reducer: reducer, 
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
    // composeWithDevTools(applyMiddleware(...middleware))
}) 

export default store 