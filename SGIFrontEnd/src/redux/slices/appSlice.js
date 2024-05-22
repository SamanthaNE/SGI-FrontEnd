import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarShow: true,
  theme: 'light',
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    set: (state, action) => {
      const {sidebarShow, theme} = action.payload;
      if (sidebarShow !== undefined) {
        state.sidebarShow = sidebarShow;
      }
      if (theme !== undefined) {
        state.theme = theme;
      }
    },
  },
})

export const { set } = appSlice.actions
export default appSlice.reducer