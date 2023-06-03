import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
// import movieReducer from "../features/movie/movieSlice";
// import 
import api from "../state/api.js"
export default configureStore({
  reducer: {
    user: userReducer,
    api: api,
    dashboard: dashboardReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});