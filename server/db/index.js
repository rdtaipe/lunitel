// /db/index.js
import express from "express";
import ProductsRoute from "./routes/products.js";
import BrandsRoute from "./routes/brands.js";
import FrontImagesRoute from "./routes/frontimages.js";
import CategoriesRoute from "./routes/categories.js"
const dbRoute = express.Router();

dbRoute.use("/products", ProductsRoute);
dbRoute.use("/brands", BrandsRoute);
dbRoute.use("/frontimages", FrontImagesRoute);
dbRoute.use("/categories", CategoriesRoute)




export default dbRoute;
