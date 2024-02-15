import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    trips: localStorage.getItem('trips') ? JSON.parse(localStorage.getItem('trips')) : [],
    selectedTrip: null
};
const tripSlice = createSlice({
    name: 'trips',
    initialState,
    reducers: {
        getTrips: (state, action) => {
            state.trips = action.payload;
            localStorage.setItem('trips', JSON.stringify(action.payload));
        },
        selectTrip: (state, action) => {
            state.selectedTrip = action.payload;
            localStorage.setItem('selectedTrip', JSON.stringify(action.payload));
        },
    }
});
export const { getTrips, selectTrip } = tripSlice.actions;
export default tripSlice.reducer;