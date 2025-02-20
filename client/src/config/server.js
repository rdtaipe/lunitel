import axios from "axios";
import store from "../redux/ReduxProvider";
const environment = process.env.NODE_ENV || "development";

/// usedispatch

const BaseUrl = {
    production: {
        server: "https://server.com",
        dashboard: "https://dashboard.com",
        client: "https://client.com",
    },
    development: {
        server: "http://localhost:5000",
        dashboard: "http://localhost:3001",
        client: "http://localhost:3000",
    },
};

const routes = {
    products: "/products",
    categories: "/categories",
    brands: "/brands",
    frontimages: "/frontimages",
    users: "/users",
    orders: "/orders",
    auth: "/auth",
    cart: "/cart",
};

// let state=store.getState()

export const endpoint = {
    routes,
    server: BaseUrl[environment].server,
    dashboard: BaseUrl[environment].dashboard,
    client: BaseUrl[environment].client,



    //global getter

    get: async (route) => {
        
        try {
            const response = await axios.get(endpoint.server + route);
            return response.data;
        } catch (error) {
            return error;
        }
   },

    // GET Categories
    //useDispatch
    getCategories: () => endpoint.get(endpoint.routes.categories),
    getBrands: () => endpoint.get(endpoint.routes.brands),
    getProducts: () => endpoint.get(endpoint.routes.products),
    getFrontImages: () => endpoint.get(endpoint.routes.frontimages),

  
}


