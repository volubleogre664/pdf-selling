import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

const initialState = {
  data: null,
  installPrompt: localStorage.getItem("pwaInstalled") ? false : true,
};

if (localStorage.getItem("jwtToken")) {
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    initialState.data = decodedToken;
  }
}

const user = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUser(state, action) {
      state.data = action.payload;
    },
    logoutUser(state) {
      state.data = null;
    },
    setInstallPrompt(state, action) {
      state.installPrompt = action.payload;
    },
  },
});

export const { setUser, setInstallPrompt, logoutUser } = user.actions;
export const selectFromUser = (state) => state?.user;
export default user.reducer;
