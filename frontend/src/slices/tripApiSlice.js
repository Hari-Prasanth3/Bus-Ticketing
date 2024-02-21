import { apiSlice } from "./apiSlice";
import { TICKETS_URL } from "../constants";
export const tripsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
    //   getTrips: builder.query({
    //     query: ({ from, to, date }) => ({
    //       url: `${TRIPS_URL}/search?from=${from}&to=${to}&date=${date}`,
    //     }),
    //     providesTags: ["Trip"],
    //     keepUnusedDataFor: 5,
    //   }),
    // }),
    getTicket: builder.query({
        query: (id) => ({
          url: `${TICKETS_URL}/${id}`
        }),
        keepUnusedDataFor: 5,
      }),
    cancel: builder.mutation({
        query: (id) => ({
          url: `${TICKETS_URL}/${id}`,
          method: 'PUT'
        }),
        keepUnusedDataFor: 5,
      }),
  }),
})
  export const {useCancelMutation,useGetTicketQuery}  = tripsApiSlice;