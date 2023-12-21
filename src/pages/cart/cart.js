import React, { useEffect, useState } from "react";
import { useCart } from "@/hooks/useCart";
import { Products } from "@/api/products";
import {
  FooterCart,
  ListCart,
  NotFound,
  Redes,
} from "@/components";
import { size } from "lodash";
import { BASE_NAME } from "@/config/constants";

const productCtrl = new Products();

export default function CartPage() {
  const { cart } = useCart("");
  const [product, setProduct] = useState("");
  const [load, setLoad] = useState(true);
  const hasProduct = size(product) > 0;

  const [newProduct, setNewProduct] = useState("");

  const identificadorUnico = generarIdentificadorUnico();

  useEffect(() => {
    (async () => {
      try {
        const data = [];
        for await (const item of cart) {
          const response = await productCtrl.getProductById(item.id);
          data.push({
            ...response,
            quantity: item.quantity,
            sauces: item.sauces,
            observation: item.observation,
          });
        }
        setProduct(data);
        setLoad(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [cart]);

  useEffect(() => {
    (async () => {
      try {
        const newObjectArray = [];

        for (const record of product) {
          const newRecord = {};
          for (const key in record) {
            if (
              Object.hasOwnProperty.call(record, key) &&
              ["name_extend", "quantity", "sauces", "observation"].includes(
                key
              )
            ) {
              newRecord[key] = record[key];
            }
          }

          if (newRecord.images) {
            newObjectArray.push({
              Producto: newRecord.name_extend,
              Cantidad: newRecord.quantity,
              Salsas: newRecord.sauces,
              // Imagen: BASE_NAME + newRecord.images,
              Observación: newRecord.observation,
            });
          } else {
            newObjectArray.push({
              Producto: newRecord.name_extend,
              Cantidad: newRecord.quantity,
              Salsas: newRecord.sauces,
              // Imagen: newRecord.image_alterna,
              Observación: newRecord.observation,
            });
          }
        }
        const newArrayAsString = JSON.stringify(newObjectArray, null, 2);

        setNewProduct(`Pedido No.  ${identificadorUnico} ${newArrayAsString}`);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [product]);

  return (
    <div>
      <Redes />
      {load ? (
        <h1>Cargando ...</h1>
      ) : (
        <>
          {hasProduct ? (
            <ListCart product={product} />
          ) : (
            <NotFound
              title={"Uppss... en este momento no hay productos en el Carrito"}
            />
          )}
        </>
      )}
      <FooterCart product={newProduct} />
    </div>
  );
}

function generarIdentificadorUnico() {
  const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numeros = "0123456789";

  let identificador = "";

  const letraAleatoria = letras[Math.floor(Math.random() * letras.length)];
  identificador += letraAleatoria;

  for (let i = 0; i < 4; i++) {
    const numeroAleatorio = Math.floor(Math.random() * 10);
    identificador += numeros[numeroAleatorio];
  }

  return identificador;
}
