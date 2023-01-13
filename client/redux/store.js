import { configureStore } from "@reduxjs/toolkit";
import clientSlice from "./slices/clientSlice";

export default configureStore({
  reducer: {
    clientSlice,
  },
});
