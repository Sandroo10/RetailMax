import React, { createContext, useState, useEffect } from 'react';
import { CategoriesContextType, Product } from './types';
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.js';

export const CategoriesContext = createContext<CategoriesContextType>({
    categories: {},
});

export const CategoriesProvider = ({ children }: { children: React.ReactNode }) => {
    const [categories, setCategories] = useState<CategoriesContextType['categories']>({});

    useEffect(() => {
        const fetchCategories = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            const transformedCategoryMap = Object.fromEntries(
                Object.entries(categoryMap).map(([key, items]) => [
                    key,
                    items.map((item, index) => ({
                        id: `${key}-${index}`,
                        name: item.title,
                        imageUrl: `https://example.com/images/${item.title.toLowerCase()}.jpg`,
                        ...item,
                    })),
                ])
            );
            setCategories(transformedCategoryMap as Record<string, Product[]>);
        };

        fetchCategories();
    }, []);

    return (
        <CategoriesContext.Provider value={{ categories }}>
            {children}
        </CategoriesContext.Provider>
    );
};
