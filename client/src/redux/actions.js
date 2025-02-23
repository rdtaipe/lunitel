// import React, { forwardRef, useImperativeHandle } from "react";
// import { createSlice, } from "@reduxjs/toolkit";
import set from "lodash/set";
import { useStore } from "react-redux";


export const actions = {

  setState(state, { payload }) {
    set(state, payload.key, payload.value); 
  },


  getCategories: (state, action) => {

    console.log("coooc", state)
    const endpoint = useStore.getState().endpoint

    const data = endpoint.get(endpoint.routes.categories)
    if (data)

      state.data.categories = data

  }

};
