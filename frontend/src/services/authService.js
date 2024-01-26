import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
    
const baseUrl = `${process.env.REACT_APP_API_URL}/api`

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userToken
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
        return headers
      }
    },
    credentials: 'include'
  }),
  endpoints: (build) => ({
    getUserDetails: build.query({
      query: () => ({
        url: '/auth/user',
        method: 'GET',
        credentials: 'include'
      }),
    }),
    logoutUser: build.query({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
        credentials: 'include'
      }),
    }),
  }),
})

// export react hook
export const { useGetUserDetailsQuery, endpoints } = authApi