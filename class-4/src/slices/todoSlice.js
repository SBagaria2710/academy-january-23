import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todoSlice",
  initialState: {
    value: "",
    todoList: ["task 1", "task 2"],
  },
  reducers: {
    setValue: (state, action) => {
      state.value = action.payload;
    },
    addTask: (state) => {
      let newTaskArr = [...state.todoList, state.value];
      state.todoList = newTaskArr;
      state.value = "";
    },
  },
});

export const { setValue, addTask } = todoSlice.actions;
export default todoSlice;