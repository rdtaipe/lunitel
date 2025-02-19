
import { productSchema, brandSchema, frontimageSchema,categoriesSchema } from "./schemas.js";
import { SheetDB, Model } from "./SheetDB.js";

const SPREADSHEET_ID = process.env.SPREADSHEET_ID || "1K2orbeGtk1w8A9LdGD2p4z2nsmR3qlcFN7ylxP0H8bY";

// let Product;
// (async () => {
//   Product = await model(SPREADSHEET_ID, "Products", productSchema);
// })();
// products
export const ProductModel = new Model(SPREADSHEET_ID, "Products", productSchema);

// brands
export const BrandModel = new Model(SPREADSHEET_ID, "Brands", brandSchema);

// front images

export const FrontImageModel = new Model(SPREADSHEET_ID, "FrontImages", frontimageSchema);

// categories

export const CategorieModel = new Model(SPREADSHEET_ID,"Categories", categoriesSchema)