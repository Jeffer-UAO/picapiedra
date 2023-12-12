import { useState } from "react";

import { getAttributeProductApi } from "../api/attribute";

export function useAttribute() {
    const [attribute, setAttribute] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getAttributeProduct = async (code) => {
       
        try {
            setLoading(true);
            const response = await getAttributeProductApi(code);
            setLoading(false);
            setAttribute(response);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    };

    return {
        error,
        loading,
        attribute,
        getAttributeProduct,
    };
}
