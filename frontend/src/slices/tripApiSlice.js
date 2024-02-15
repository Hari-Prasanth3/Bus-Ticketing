import { apiSlice } from "./apiSlice";
import { TRIPS_URL } from "../constants";
export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      getProducts: builder.query({
        query: ({ keyword, pageNumber }) => ({
          url: TRIPS_URL,
          params: {
            keyword,
            pageNumber,
          },
        }),
        providesTags: ["Trip"],
        keepUnusedDataFor: 5,
      }),
    }),
  })