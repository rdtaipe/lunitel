import express from 'express';
import { FrontImageModel } from "../models.js";

const FrontImagesRoute = express.Router();

// Crear una nueva imagen

FrontImagesRoute.post("/", async (req, res) => {
    try {
        const images = Array.isArray(req.body) ? req.body : [req.body]; // Convertir en array si no lo es
        const insertedImages = [];

        for (const image of images) {
            const { name, description, image } = image;

            if (!name) {
                return res.status(400).json({ error: "El campo 'name' es obligatorio en todos los objetos" });
            }

            const newImage = {
                name,
                description: description || "",
                image: image || "",
            };

            const result = await FrontImageModel.create(newImage);
            insertedImages.push(result);
        }

        res.status(201).json({ message: "Imagenes agregadas exitosamente", images: insertedImages });

    } catch (error) {
        console.error("Error al agregar las imagenes:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}
);

// Leer todas las imagenes
FrontImagesRoute.get("/", async (req, res) => {
    try {
        const images = await FrontImageModel.getAllRows();
        res.status(200).json(images);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las imagenes" });
    }
});

// Leer una imagen según un query (por ejemplo, buscar por nombre)
FrontImagesRoute.get("/find", async (req, res) => {
    try {
        const query = req.query;
        const image = await FrontImageModel.findOne(query);
        res.json(image);
    } catch (error) {
        //         res.status(500).json({error: error.message});
    }
});

// Actualizar una imagen según un query (por ejemplo, buscar por nombre)

FrontImagesRoute.put("/update", async (req, res) => {
    try {
        const query = req.query;
        const { name, description, image } = req.body;

        if (!name) {
            return res.status(400).json({ error: "El campo 'name' es obligatorio" });
        }

        const newImage = {
            name,
            description: description || "",
            image: image || "",
        };

        const result = await FrontImageModel.updateOne(query, newImage);
        res.json(result);

    } catch (error) {
        console.error("Error al actualizar la imagen:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}
);

// Eliminar una imagen

FrontImagesRoute.delete("/", async (req, res) => {
    try {
        const query = req.query;
        const result = await FrontImageModel.deleteOne(query);
        res.json(result);
    } catch (error) {
        console.error("Error al eliminar la imagen:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}
);

export default FrontImagesRoute;