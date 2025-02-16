import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      console.log("Token from localStorage:", token); 

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      } else {
        console.warn("Token not found in localStorage");
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({}),
});

export const {} = ApiSlice;

