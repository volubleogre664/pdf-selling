import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user";
import bookReducer from "./features/book";

const store = configureStore({
  reducer: {
    user: userReducer,
    book: bookReducer,
  },
});

export default store;
