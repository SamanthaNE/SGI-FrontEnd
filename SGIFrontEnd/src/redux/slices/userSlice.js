import { createSlice } from "@reduxjs/toolkit";

const initialState ={
  name: "",
  email: "",
  role: "",
  idPerson: "",
  scopusAuthorId: "",
}

export const userSlice = createSlice ({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const {name, email, role, idPerson, scopusAuthorId} = action.payload;
      state.name = name;
      state.email = email;
      state.role = role;
      state.idPerson = idPerson;
      state.scopusAuthorId = scopusAuthorId;
    },
  },
})

export const { addUser } = userSlice.actions
export default userSlice.reducer