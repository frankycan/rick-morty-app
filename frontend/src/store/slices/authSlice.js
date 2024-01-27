import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { registerUser, userLogin, userLogout } from './authActions.js'
import axios from "axios"

const BACKEND_URL = `${process.env.REACT_APP_API_URL}/api`

const initialState = {
    loading: false,
    userInfo: null, // for user object
    userToken: null, // for storing the JWT
    error: null,
    successRegistration: false, // for monitoring the registration process.
}

export const userUpdate = createAsyncThunk("auth/update", async ({ data }) => {
  // await AuthService.update(data);
  await axios.put(BACKEND_URL + "/auth/users", data, { withCredentials: true });
  return { user: data };
});

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
        state.successRegistration = true // registration successful
      }),
      builder.addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      }),
      builder.addCase(userUpdate.fulfilled, (state, { payload }) => {
        state.userInfo.favoriteCharacters = payload.user.favoriteCharacters
        state.error = null
      }),
      builder.addCase(userUpdate.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
    }
})

export const { setCredentials } = authSlice.actions
export default authSlice.reducer