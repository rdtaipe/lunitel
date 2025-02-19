// /db/index.js
import express from "express";
import { ProductModel } from "../models.js";

const ProductsRoute = express.Router();



// Crear un nuevo producto
ProductsRoute.post("/", async (req, res) => {
    try {
        const { category, name, description, price, discount, brand, colors, sizes, images } = req.body;

        if (!category || !name || !price) {
            return res.status(400).json({ error: "Los campos 'category', 'name' y 'price' son obligatorios" });
        }

        const newProduct = {
            category,
            name,
            description: description || "",
            price: Number(price),
            discount: Number(discount) || 0,
            brand: brand || "",
            colors: Array.isArray(colors) ? colors : [],
            sizes: Array.isArray(sizes) ? sizes : [],
            images: Array.isArray(images) ? images : [],
        };

        // const result = await ProductModel.create(newProduct);
        // const result = await db.create(newProduct);
        const result = await ProductModel.create(newProduct);

        res.status(201).json({ message: "Producto agregado exitosamente", product: result });

    } catch (error) {
        console.error("Error al agregar el producto:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Leer todos los productos
ProductsRoute.get("/", async (req, res) => {
    try {
        const products = await ProductModel.getAllRows();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los productos" });
    }
});

// Leer un producto según un query (por ejemplo, buscar por nombre o marca)
ProductsRoute.get("/find", async (req, res) => {
    try {
        const query = req.query;
        const product = await ProductModel.findOne(query);
        res.json(product);
    } catch (error) {
        //         res.status(500).json({ error: error.message });
    }
});

// Actualizar producto(s)
ProductsRoute.put("/", async (req, res) => {
    try {
        // Se espera recibir en el body: { query: { ... }, updateData: { ... } }
        const { query, updateData } = req.body;
        const updatedCount = await ProductModel.update(query, updateData);
        res.json({ message: "Producto(s) actualizado(s)", updated: updatedCount });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar producto(s)
ProductsRoute.delete("/", async (req, res) => {
    try {
        // Se espera recibir en el body un objeto con la consulta para eliminar
        const query = req.body;
        const deletedCount = await ProductModel.delete(query);
        res.json({ message: "Producto(s) eliminado(s)", deleted: deletedCount });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default ProductsRoute
