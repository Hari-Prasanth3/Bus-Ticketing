import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import authSliceReducer from './slices/authSlice'
import tripSliceReducer from "./slices/tripSlice";

const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSliceReducer,
        trip: tripSliceReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat
    (apiSlice.middleware),
    devTools: true,

});

export default store