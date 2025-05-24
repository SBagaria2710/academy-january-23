import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slices/counterSlice";
import todoSlice from "./slices/todoSlice";

const store = configureStore({
  reducer: {
    counterState: counterSlice.reducer,
    todoState: todoSlice.reducer
  },
});

export default store;