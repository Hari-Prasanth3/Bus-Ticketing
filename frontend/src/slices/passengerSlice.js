import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    passengers: localStorage.getItem('passengers') ? JSON.parse(localStorage.getItem('passengers')) : null,
};
const passengerSlice = createSlice({
    name: 'passenger',
    initialState,
    reducers: {
        addPassenger: (state, action) => {
            state.passengers = action.payload;
            localStorage.setItem('passengers', JSON.stringify(state.passengers));
        },
        clearPassengers: (state) => {
            state.passengers = null;
            localStorage.setItem('passengers', JSON.stringify(state.passengers));
        },
    },
});
export const { addPassenger, removePassenger, clearPassengers } = passengerSlice.actions;
export default passengerSlice.reducer;









