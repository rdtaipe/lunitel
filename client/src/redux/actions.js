import { createSlice } from "@reduxjs/toolkit";
import {useStore } from "react-redux";


export const actions = {
  

  setUrlBase: (state, action) => {
    state.server.url = action.payload;
  },


};
