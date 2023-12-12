import { BASE_API } from "../config/constants";


export async function getAttributeProductApi(code) {

    const codeFilter = `product=${code}`;
   
    try {
      const url = `${BASE_API}/api/product_attribute/?${codeFilter}`;
      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }