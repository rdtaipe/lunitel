// /db/schemas.js
// import { text } from "stream/consumers";
import { Schema } from "./SheetDB.js";


export const globalSchema = new Schema({
  id: "number",
  name: "text",
  subcategories: "array"
})


// products schema
export const productSchema = new Schema({
  category: "text",
  name: "text",
  description: "text",
  price: "num",
  discount: "num",
  brand: "text",
  colors: "array",
  sizes: "array",
  images: "array"
});

// brands schema
export const brandSchema = new Schema({
  name: "text",
  image: "text",
  description: "text",
});

// front image schema

export const frontimageSchema = new Schema({
  header: "text",
  text: "text",
  mobile_image: "text",
  desktop_image: "text",
  url: "text"
});
// categories
export const categoriesSchema = new Schema({
  id: "number",
  name: "text",
  subcategories: "array"
})