import { createSlice } from "@reduxjs/toolkit";

export const deleteIDSlice = createSlice({
  name: "deleteID",
  initialState: {
    deleteID: "",
  },
  reducers: {
    setDeleteId: (state, action) => {
      state.deleteID = action.payload;
    },
  },
});

export const { setDeleteId} = deleteIDSlice.actions;

export default deleteIDSlice.reducer;
