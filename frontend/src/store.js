import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import authSliceReducer from './slices/authSlice'
import tripSliceReducer from "./slices/tripSlice";
import passengerSliceReducer from "./slices/passengerSlice";

const store = configureStore({
    reducer:{
       
        auth: authSliceReducer,
        trip: tripSliceReducer,
        passenger: passengerSliceReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat
    (apiSlice.middleware),
    devTools: true,

});

export default store