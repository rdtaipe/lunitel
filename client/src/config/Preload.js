// Preloader.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../app/components/Loader';

export const DataContext = React.createContext();
const Preloader = ({ expiration = 60000, wait, lastFetchName, children }) => {
    const action = useSelector((state) => state.actions);
    const endpoints = action.get("endpoint");
    const { getProducts, getFrontImages, getCategories, getBrands } = endpoints;

    // Estado opcional para compartir la data localmente a través del contexto
    const [data, setData] = useState(null);
    // Última vez que se cargó la data para el identificador "valor"
    const lastFetch = useSelector(
        (state) => state.data.lastFetch && state.data.lastFetch[lastFetchName]
    );
    // Estado de loading según la prop wait
    const [loading, setLoading] = useState(wait === true);
    // Ref para evitar múltiples llamadas en el mismo montaje
    const didLoad = useRef(false);

    useEffect(() => {
        if (didLoad.current) return;

        const now = Date.now();

        // Si ya se realizó la carga recientemente (dentro del tiempo de expiración) se evita volver a cargar
        if (lastFetch && now - lastFetch < expiration) {
            didLoad.current = true;
            setLoading(false);
            return;
        }


        const loadData = async () => {
            try {
                const productsData = await getProducts();
                if (productsData) {
                    action.set({ key: "data.products", value: productsData });
                }

                const categoriesData = await getCategories();
                if (categoriesData) {
                    action.set({ key: "data.categories", value: categoriesData });
                }

                const brandsData = await getBrands();
                if (brandsData) {
                    action.set({ key: "data.brands", value: brandsData });
                }

                const frontImagesData = await getFrontImages();
                if (frontImagesData) {
                    action.set({ key: "data.frontImages", value: frontImagesData });
                }

                // Actualizamos la marca de tiempo en el store global
                action.set({ key: `data.lastFetch.${lastFetchName}`, value: now });

                // Opcional: actualizar la data local para compartir a través del contexto
                setData({
                    products: productsData,
                    categories: categoriesData,
                    brands: brandsData,
                    frontImages: frontImagesData,
                });
            } catch (error) {
                setLoading(false);
                console.log("Error Get data", error);

            } finally {
                didLoad.current = true;
                setLoading(false);
                console.log("Get data finished", action.get("data"));
            }
        };

        loadData();

    }, [
        action,
        getProducts,
        getCategories,
        getBrands,
        getFrontImages,
        lastFetch,
        lastFetchName,
        expiration,
        wait,
    ]);

    return (
        <DataContext.Provider value={{ data, setData }}>
            {wait === true ? (loading ? <Loader /> : children) : children}
        </DataContext.Provider>
    );
};

export default Preloader;
