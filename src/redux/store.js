import { configureStore } from "@reduxjs/toolkit";
import deleteIDReducer from "./deleteId";

export const store = configureStore({
  reducer: {
    deleteID: deleteIDReducer,
  },
});
