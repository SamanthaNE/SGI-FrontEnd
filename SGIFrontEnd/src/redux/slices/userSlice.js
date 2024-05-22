import { createSlice } from "@reduxjs/toolkit";

const initialState ={
  name: "",
  username: "",
  email: "",
  role: "",
}

export const userSlice = createSlice ({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const {name, username, email, role} = action.payload;
      state.name = name;
      state.username = username;
      state.email = email;
      state.role = role;
    },
  },
})

export const { addUser } = userSlice.actions
export default userSlice.reducer