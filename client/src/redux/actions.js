import { createSlice } from "@reduxjs/toolkit";
import {useStore } from "react-redux";


export const actions = {

  setUrlBase: (state, action) => {
    state.server.url = action.payload;
  },
  getCategories: (state, action) => { 
    console.log("coooc",state)
    const endpoint = useStore.getState().endpoint
  
    const data =  endpoint.get(endpoint.routes.categories)
    if (data) 

      state.data.categories = data

  } 
  
};
