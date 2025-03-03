// import { server } from "./server";
import { data } from "react-router-dom";

import style from "../functions/style"
import endpoint from "../functions/server"
import router from "../functions/router"
import sort from "../functions/sort"



export const initialState = {
    document: {
        head: {
            title: "Ubiquitilux",
            description: "Web site created using create-react-app",
            keywords: "web, react, create-react-app",
            author: "Rolando Taipe",
        },
    },
    router: router,
    sort: sort,

    data: {
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
