import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice.js"
import { authApi } from '../services/authService.js'

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
export default store