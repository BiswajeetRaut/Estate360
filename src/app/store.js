import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
// import movieReducer from "../features/movie/movieSlice";
// import 
import api from "../state/api.js"
export default configureStore({
  reducer: {
    user: userReducer,
    api: api,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});