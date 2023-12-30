import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      console.log("befor update==>", state);
      state.userInfo = action.payload;
      console.log("after update==>", state);
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    }
  }
});

export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;
