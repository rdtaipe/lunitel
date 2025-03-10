import express from 'express';
import { CategorieModel } from "../models.js";

const CategoriesRoute = express.Router();

// Crear una nueva marca
CategoriesRoute.post("/", async (req, res) => {
    try {
        const Categories = Array.isArray(req.body) ? req.body : [req.body]; // Convertir en array si no lo es
        const insertedCategories = [];

        for (const brand of Categories) {
            const { id, name, subcategories } = brand;

            if (!name) {
                return res.status(400).json({ error: "El campo 'name' es obligatorio en todos los objetos" });
            }

            const newCategories = {
                id,
                name,
                subcategories: subcategories || "",
            };

            const result = await CategorieModel.create(newCategories);
            insertedCategories.push(result);
        }

        res.status(201).json({ message: "Marcas agregadas exitosamente", brands: insertedBrands });

    } catch (error) {
        console.error("Error al agregar las marcas:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Leer todas las marcas
CategoriesRoute.get("/", async (req, res) => {
    try {
        const  category = await CategorieModel.getAllRows();
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las marcas" });
    }
});

// Leer una marca según un query (por ejemplo, buscar por nombre)
CategoriesRoute.get("/find", async (req, res) => {
    try {
        const query = req.query;
        const brand = await CategorieModel.findOne(query);
        res.json(brand);
    } catch (error) {
        //         res.status(500).json({error: error.message});
    }
});

// Actualizar una marca según un query (por ejemplo, buscar por nombre)

CategoriesRoute.put("/update", async (req, res) => {
    try {
        const query = req.query;
        const updateData = req.body;
        const updatedBrand = await CategorieModel.update(query, updateData);
        res.json(updatedBrand);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar la marca" });
    }
}
);

// Eliminar una marca según un query (por ejemplo, buscar por nombre)
CategoriesRoute.delete("/delete", async (req, res) => {
    try {
        const query = req.query;
        const deletedBrand = await CategorieModel.delete(query);
        res.json(deletedBrand);
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar la marca" });
    }
}
);


export default CategoriesRoute;

