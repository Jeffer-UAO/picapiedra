import React, { useEffect, useState } from "react";
import { map, size } from "lodash";
import { BASE_NAME } from "@/config/constants";
import { useWhatsApp, useGallery, useCart, useAttribute } from "@/hooks";
import { toast } from "react-toastify";
import { SaucesList } from "../Sauces";

import { ImageCarousel } from "../ImageCarousel";

import {
  CardImg,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

import { BsWhatsapp } from "react-icons/bs";
import styles from "./DetailProduct.module.scss";
import { BtnCircle, BtnMagic } from "../Common";

export function DetailProduct(props) {
  const { product, relate } = props;
  const { addCart } = useCart();
  const { getGalleryByCode, gallery } = useGallery();
  const { getAttributeProduct, attribute, loading } = useAttribute();
  const { generateWhatsAppLink, items, selectedItem, handleItemClick } =
    useWhatsApp();

  const { ...productDetall } = product ?? {};

  const [productData, setProductData] = useState(productDetall[0]);
  const [idProduct, setIdPropduct] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [propductWhatsApp, setPropductWhatsApp] = useState("");
  const [propductAlternaWhatsApp, setPropductAlternaWhatsApp] = useState("");
  const [observation, setObservation] = useState("");
  const [total, setTotal] = useState(1);
  const [sauces, setSauces] = useState([]);


  const format = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  
  
  useEffect(() => {
    const nameSauces = attribute?.map((data) => data.dataAttribute.name); 
    setSauces(nameSauces);
  }, [attribute]);

  useEffect(() => {
    getGalleryByCode(productData?.codigo);
  }, []);

  const updateSauces = (sauceName, checked) => {
    if (checked) {
      setSauces((prevSauces) =>
        prevSauces.filter((sauce) => sauce !== sauceName)
      );
    }
    if (!checked) {
      if (!sauces.includes(sauceName)) {
        setSauces((prevSauces) => [...prevSauces, sauceName]);
      }
    }
  };

  const changeDetail = (data) => {
    setProductData(data);
    getGalleryByCode(data.codigo);
    window.scrollTo(0, 0);
  };

  //-----------------------------------------------

  const openCloseModal = () => setShowModal((prev) => !prev);

  const addProductId = (id) => {
    setIdPropduct(id);
    getAttributeProduct(id);
    openCloseModal();
  };

  const addData = () => {
    addCart(idProduct, total, sauces, observation);
    toast.success("¡Se agrego con exito!");
    openCloseModal();
  };

  const handleQuantityChange = (event) => {
    const text = event.target.value;
    setObservation(text);
  };

  const quantityChance = (quantity) => {
    if (quantity > 0) {
      setTotal(total + 1);
    } else {
      setTotal(total - 1);
      if(total < 2){
        setTotal(1);
      }
    }
   
  };
  //-------------------------------------

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const addProductToWhatsApp = (data) => {
    setPropductWhatsApp(data);
    toggleModal();
  };

  const addProductAlternaToWhatsApp = (data) => {
    setPropductAlternaWhatsApp(data);
    toggleModal();
  };

  const addDataToWhatsApp = () => {
    if (propductWhatsApp != "") {
      const whatsappLink = generateWhatsAppLink(
        selectedItem,
        BASE_NAME + propductWhatsApp
      );

      window.location.href = whatsappLink;
      toggleModal();
    } else {
      const whatsappLink = generateWhatsAppLink(
        selectedItem,
        propductAlternaWhatsApp
      );

      window.location.href = whatsappLink;
      toggleModal();
    }
  };

  if (product) {
    return (
      <>
        <div className={styles.detailProduct}>
          <div className={styles.product} id="seccion-1">
            {size(gallery) > 0 ? (
              <ImageCarousel images={gallery} />
            ) : productData?.images ? (
              <CardImg
                alt="Card image cap"
                src={BASE_NAME + productData?.images}
              />
            ) : (
              <CardImg alt="Card image cap" src={productData?.image_alterna} />
            )}

            <div className={styles.description}>
              <CardTitle className={styles.title}>
                <h5 className={styles.name_extend}>
                  {productData?.name_extend}
                </h5>
                <div className={styles.price}>
                  {productData?.price1 > 1 && (
                    <h6>$ {format(productData?.price1)} </h6>
                  )}
                </div>
              </CardTitle>

              <Button onClick={() => addProductId(productData.codigo)}>
                Agregar al Carrito
              </Button>
              <label>{productData?.description}</label>
            </div>
          </div>

          <div className={styles.relate}>
            {/* <p>PRODUCTOS RELACIONADOS</p> */}

            <div className={styles.list}>
              {map(relate, (product, index) => (
                <div key={index}>
                  {product.images ? (
                    <div
                      className={styles.list__product2}
                      onClick={() => changeDetail(product)}
                    >
                      <CardImg
                        alt="Card image cap"
                        src={BASE_NAME + product.images}
                      />

                      <div className={styles.name}>
                        <CardTitle>
                          <h5>{product.name_extend}</h5>
                          <h6>$. {format(product.price1)}</h6>
                        </CardTitle>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={styles.list__product2}
                      onClick={() => changeDetail(product)}
                    >
                      <CardImg
                        alt="Card image cap"
                        src={product.image_alterna}
                      />

                      <div className={styles.name}>
                        <CardTitle>
                          <h5>{product.name_extend}</h5>
                          <h6>$. {format(product.price1)}</h6>
                        </CardTitle>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Modal centered isOpen={showModal} toggle={openCloseModal}>
            <ModalHeader toggle={openCloseModal}>
              Detalles del Pedido
            </ModalHeader>

            <ModalBody>
              <FormGroup>
                {map(attribute, (data, index) => (
                  <SaucesList
                    key={index}
                    id={index}
                    name={data.dataAttribute.name}
                    process={updateSauces}
                  />
                ))}

                <div className={styles.content_btns}>
                  <div className={styles.maxmin}>
                    <BtnCircle
                      btnType="minus"
                      color="grey"
                      f={quantityChance}
                    />
                    <label>{total}</label>
                    <BtnCircle
                      color="green"
                      btnType="plus"
                      f={quantityChance}
                    />
                    <label>Cantidad</label>
                  </div>
                </div>

                <FormGroup>                  
                  <Input
                    id="observation"
                    name="observation"
                    type="textarea"
                    value={observation}
                    placeholder="Observaciónes"
                    onChange={handleQuantityChange}
                  />
                </FormGroup>

                {/* <div className={styles.input}>
                  <Input
                    value={quantity}
                    type="number"
                    name="cantidad"
                    id="cantidad"
                    placeholder="Cantidad"
                    onChange={handleQuantityChange}
                  />               
                </div> */}
              </FormGroup>
            </ModalBody>

            <ModalFooter>
              <Button color="secondary" onClick={openCloseModal}>
                Cancelar
              </Button>
              <Button color="primary" onClick={addData}>
                Aceptar
              </Button>{" "}
            </ModalFooter>
          </Modal>

          <Modal centered isOpen={isOpen} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>Seleccione una Lìnea</ModalHeader>

            <ModalBody>
              <FormGroup>
                {items.map((item, index) => (
                  <Button
                    key={index}
                    color="success"
                    size="sm"
                    outline
                    className={index === selectedItem ? "selected" : ""}
                    onClick={() => handleItemClick(item)}
                  >
                    <BsWhatsapp size={20} /> Linea {index + 1}
                  </Button>
                ))}
              </FormGroup>
            </ModalBody>

            <ModalFooter>
              <Button size="sm" outline color="secondary" onClick={toggleModal}>
                Cancelar
              </Button>
              <Button size="sm" color="success" onClick={addDataToWhatsApp}>
                Aceptar
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </>
    );
  } else {
    return <h5> La pagina no existe</h5>;
  }
}
