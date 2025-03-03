import express from 'express';
import { Model, Schema } from "../SheetDB.js";

const SPREADSHEET_ID = process.env.SPREADSHEET_ID || "1K2orbeGtk1w8A9LdGD2p4z2nsmR3qlcFN7ylxP0H8bY";
const route = express.Router();

route.get("/", async (req, res) => {
    const query = req.query; // { Categories: ["category", "countCategory"] } en caso de múltiples valores

    // Asegurar que Categories sea un array (en caso de un solo valor, convertirlo a array)
    const keys = Object.keys(query)
    if (keys[0] === undefined) {
        return res.status(400).json({ error: "No se proporcionaron categorías" });
    }

    const values = Array.isArray(query.Categories) ? query.Categories : [query.Categories];
    const newQuery = { keys, value: values }

    const GlobalModel = new Model(SPREADSHEET_ID, keys[0], Schema);

    try {
        // Buscar cada valor en la base de datos
        const results = await Promise.all(values.map(async (value, i) => {

            return await GlobalModel.find(value);
        }));

        // Asegurar que las respuestas estén alineadas
        const mergedData = results[0].map((_, i) => {
            let obj = {};
            values.forEach((key, j) => {
                if (results[j][i]) {
                    obj[key] = results[j][i].category; // Extraer categoría correspondiente
                }
            });
            return obj;
        });

        res.status(200).json(mergedData);
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        res.status(500).json({ error: "Error al obtener los datos" });
    }
});

export default route;
