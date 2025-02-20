// import { server } from "./server";
import { style } from "../config/style";
import { endpoint } from "../config/server";



export const initialState = {

    data:{
        categories: [],

        
    },

    endpoint,
    style,
    test: {
        obj: {
            a: 1,
            value: true,
            b: [
                { id: "asd", a: 1 },
                { id: "abd", a: 1 },
            ],
        },
    },


};
