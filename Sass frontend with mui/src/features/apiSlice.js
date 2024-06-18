import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { baseUrl } from "../Api,s/BaseUrl";
export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tageTypes: ["User"],
  endpoints: (builder) => ({
    GetAllUser: builder.query({
      query: () => ({
        url: "user/getall",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    CreateUser: builder.mutation({
      query: (data) => ({
        url: "user/register",
        method: "POST",
        body: { data },
      }),
      invalidatesTags: ["User"],
    }),
    LoginUser: builder.mutation({
      query: (data) => ({
        url: "user/login",
        method: "POST",
        body: { data },
      }),
      invalidatesTags: ["User"],
    }),

    DeleteUser: builder.mutation({
      query: (id) => ({
        url: `user/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    UploadPhoto: builder.mutation({
      query: (photo) => ({
        url: "user/upload",
        method: "POST",
        body: photo,
        formData: true,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useCreateUserMutation,
  useLoginUserMutation,
  useDeleteUserMutation,
  useUploadPhotoMutation,
} = productsApi;
