// import { configureStore } from '@reduxjs/toolkit'
// import mainSlice from './redxSlice'
// // ...

// export const store = configureStore({
//     reducer: {
//         main: mainSlice,
//     },
// })

// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch


import { configureStore } from '@reduxjs/toolkit'
import mainSlice from './redxSlice'
import { combineReducers } from '@reduxjs/toolkit';

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

let persistConfig = {
    key: 'root',
    storage
};

let rootReducer = combineReducers({
    main: mainSlice,
})

let persistedReducer = persistReducer(persistConfig, rootReducer)
// ...

export const store = configureStore({
    reducer: persistedReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch