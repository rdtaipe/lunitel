import set from "lodash/set";

export const actions = {
  setState(state, { payload }) {
    set(state, payload.key, payload.value); 
  },

};
