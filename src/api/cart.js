import { forEach } from "lodash";
import { CART } from "../config/constants";

export class Cart {
  add(itemId, quantity, sauces, observation) {
    const products = this.getAll();
    const objIndex = products.findIndex((product) => product.id === itemId);

    products.push({
      id: itemId,
      quantity,
      sauces,
      observation,
    });

    localStorage.setItem(CART, JSON.stringify(products));
  }

  decrease(objIndex) {
    const products = this.getAll();   
      const product = products[objIndex];
      if (product.quantity > 1) {
        products[objIndex].quantity = product.quantity - 1;
        localStorage.setItem(CART, JSON.stringify(products));
      } else {
        this.delete(objIndex);
      } 
  }

  increment(objIndex) {
    const products = this.getAll();
    const product = products[objIndex];
    products[objIndex].quantity = product.quantity + 1;
    localStorage.setItem(CART, JSON.stringify(products));
  }

  delete(objIndex) {
    console.log(objIndex);
    const products = this.getAll();
    const filteredProducts = products.filter((product, index) => index !== objIndex);
    localStorage.setItem(CART, JSON.stringify(filteredProducts));
  }

  getAll() {
    const response = localStorage.getItem(CART);
    if (!response) {
      return [];
    } else {
      return JSON.parse(response);
    }
  }

  deleteAll() {
    localStorage.removeItem(CART);
  }

  count() {
    let count = 0;
    const response = this.getAll();

    forEach(response, (item) => {
      count += item.quantity;
    });

    return count;
  }
}
