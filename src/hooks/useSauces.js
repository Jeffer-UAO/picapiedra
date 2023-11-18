import { useState } from "react";
import {
  getSauceToIdApi,
  getSaucesActiveApi,
  getSaucesApi,
  getSauceToProductApi,
  getSaucesToProductIdApi,
  getSaucesByOrderIdApi
} from "../api/sauce";

export function useSauces() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sauces, setSauces] = useState(null);
  const [saucesMini, setSaucesMini] = useState(null);
  const [sauceByOrder, setSauceByOrder] = useState(null);

  const data = [];

  const getSauceToId = async (idSauce) => {
    try {
      setLoading(true);
      const response = await getSauceToIdApi(idSauce);
      setLoading(false);

      data.push(response);
      setSauces(data);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getSaucesActive = async () => {
    try {
      setLoading(true);
      const response = await getSaucesActiveApi();
      setLoading(false);
      setSauces(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getSauces = async () => {
    try {
      setLoading(true);
      const response = await getSaucesApi();
      setLoading(false);
      setSauces(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getSauceToProduct = async (idProduct, idSauce) => {
    try {
      setLoading(true);
      const response = await getSauceToProductApi(idProduct, idSauce);
      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getSaucesToProductId = async (idProduct) => {
    try {
      setLoading(true);
      const response = await getSaucesToProductIdApi(idProduct);
      setLoading(false);
      setSaucesMini(response);      
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };


  const getSaucesByOrderId = async (idOrder) => {
    
    const sauces = [];
    try {
      setLoading(true);
      const response = await getSaucesByOrderIdApi(idOrder);
      
      if (response && response != "") {   
        for (let i = 0; i < response.length; i++) {
          if(response[i].sauces){
            const result = await getSauceToIdApi(response[i].sauces);
            sauces.push(result);
          }
                 
        }
      }
      setLoading(false);
      setSauceByOrder(sauces);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return {
    error,
    loading,
    sauces,
    saucesMini,
    sauceByOrder,
    getSaucesActive,
    getSauces,
    getSauceToId,
    getSaucesByOrderId,
    getSauceToProduct,
    getSaucesToProductId,
  };
}
