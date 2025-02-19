import express from 'express';
import { BrandModel } from "../models.js";

const BrandsRoute = express.Router();

// Crear una nueva marca
BrandsRoute.post("/", async (req, res) => {
    try {
        const brands = Array.isArray(req.body) ? req.body : [req.body]; // Convertir en array si no lo es
        const insertedBrands = [];

        for (const brand of brands) {
            const { name, description, image } = brand;

            if (!name) {
                return res.status(400).json({ error: "El campo 'name' es obligatorio en todos los objetos" });
            }

            const newBrand = {
                name,
                description: description || "",
                image: image || "",
            };

            const result = await BrandModel.create(newBrand);
            insertedBrands.push(result);
        }

        res.status(201).json({ message: "Marcas agregadas exitosamente", brands: insertedBrands });

    } catch (error) {
        console.error("Error al agregar las marcas:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Leer todas las marcas
BrandsRoute.get("/", async (req, res) => {
    try {
        const brands = await BrandModel.getAllRows();
        res.status(200).json(brands);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las marcas" });
    }
});

// Leer una marca según un query (por ejemplo, buscar por nombre)
BrandsRoute.get("/find", async (req, res) => {
    try {
        const query = req.query;
        const brand = await BrandModel.findOne(query);
        res.json(brand);
    } catch (error) {
        //         res.status(500).json({error: error.message});
    }
});

// Actualizar una marca según un query (por ejemplo, buscar por nombre)

BrandsRoute.put("/update", async (req, res) => {
    try {
        const query = req.query;
        const updateData = req.body;
        const updatedBrand = await BrandModel.update(query, updateData);
        res.json(updatedBrand);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar la marca" });
    }
}
);

// Eliminar una marca según un query (por ejemplo, buscar por nombre)
BrandsRoute.delete("/delete", async (req, res) => {
    try {
        const query = req.query;
        const deletedBrand = await BrandModel.delete(query);
        res.json(deletedBrand);
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar la marca" });
    }
}
);


export default BrandsRoute;


