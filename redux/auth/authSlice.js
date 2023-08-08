import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  nickName: null,
  stateChange: false,
  comment: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    updateUser: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      nickName: payload.nickName,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authSignOut: () => initialState,
  },
  authComment: (state, { payload }) => (
    console.log(payload),
    {
      ...state,
      comment: payload.view,
    }
  ),
});
export const { updateUser, authStateChange, authSignOut, authCommet } =
  authSlice.actions;

export default authSlice.reducer;
