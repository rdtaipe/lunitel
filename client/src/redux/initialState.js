// import { server } from "./server";
import { style } from "../config/style";
import { endpoint } from "../config/server";
import { data } from "react-router-dom";



export const initialState = {
    router: {
        location: {
            pathname: "/",
        },
        navigate: () => {},
        match: {
            params: {},
        },
        history: {
            push: () => {},
        },

        
    },

    data:{
        categories: [],
    },
    MenuCategories: {
        index: 0,
        data: [],
        isOpen: false,
        anchorEl: null,
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
