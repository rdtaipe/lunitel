import axios from "axios";
const environment = process.env.NODE_ENV || "development";

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

const Routes = {
    products: "/products",
    categories: "/categories",
    brands: "/brands",
    users: "/users",
    orders: "/orders",
    auth: "/auth",
    cart: "/cart",
};

export const endpoint = {
    server: BaseUrl[environment].server,
    dashboard: BaseUrl[environment].dashboard,
    client: BaseUrl[environment].client,


    

    get: async (route) => {
        
         try {
             const response = await axios.get(endpoint.server + route);
             return response.data;
         } catch (error) {
             return error;
         }
    },

}


