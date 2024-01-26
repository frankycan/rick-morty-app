import { createSlice } from '@reduxjs/toolkit'
import { registerUser, userLogin, userLogout } from './authActions.js'

const initialState = {
    loading: false,
    userInfo: null, // for user object
    userToken: null, // for storing the JWT
    error: null,
    success: false, // for monitoring the registration process.
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      setCredentials: (state, { payload }) => {
        state.userInfo = payload
      },
    },
    extraReducers: builder => {
      // login user
      builder.addCase(userLogin.pending, (state) => {
        state.loading = true
        state.error = null
      }),
      builder.addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false
        state.userInfo = payload
        state.userToken = payload.userToken
      }),
      builder.addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      }),
      // logout user
      builder.addCase(userLogout.pending, (state) => {
        state.loading = true
        state.error = null
      }),
      builder.addCase(userLogout.fulfilled, (state, { payload }) => {
        state.loading = false
        state.userInfo = null
        state.userToken = null
      }),
      builder.addCase(userLogout.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      }),
      // register user
      builder.addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      }),
      builder.addCase(registerUser.fulfilled, (state) => {
        state.loading = false
        state.success = true // registration successful
      }),
      builder.addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
    }
})

export const { setCredentials } = authSlice.actions
export default authSlice.reducer