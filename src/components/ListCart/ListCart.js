import { useCart } from "@/hooks/useCart";
import { Button, CardImg } from "reactstrap";
import { map } from "lodash";
import { BASE_NAME } from "@/config/constants";

import { BsTrash3 } from "react-icons/bs";
import { AiFillPlusCircle } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";

import styles from "./ListCart.module.scss";

export function ListCart(props) {
  const { product } = props;
  const { decreaseCart, incrementCart, deleteCart } = useCart();
  const format = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  console.log(product);
  const scale = "c_scale,f_auto,q_50,w_150/";
  const upload = "image/upload/";

  return (
    <div className={styles.list}>
      <h4>CARRITO</h4>
      {map(product, (item, index) => (
        <div className={styles.content}>
          <div key={index} className={styles.card}>
            {item.images ? (
              <CardImg
                alt="Card image cap"
                src={BASE_NAME + upload + scale + item.images.split(upload)[1]}
                className={styles.skeleton}
              />
            ) : (
              <CardImg
                alt="Card image cap"
                src={item.image_alterna}
                className={styles.skeleton}
              />
            )}

            <div className={styles.detalle}>
              <p className={styles.name}>{item.name_extend}</p>
              <p className={styles.price}>$ {format(item.price1)} </p>

              <div className={styles.btn}>
                <span>
                  <AiOutlineMinusCircle
                    onClick={() => decreaseCart(index)}
                    size={30}
                    color="grey"
                  />
                  <p>{item.quantity}</p>
                  <AiFillPlusCircle
                    onClick={() => incrementCart(index)}
                    size={30}
                    color="green"
                  />
                </span>

                <Button
                  onClick={() => deleteCart(index)}
                  className={styles.btnDelete}
                >
                  <BsTrash3 size="15" color="red" />
                </Button>
              </div>
            </div>
          </div>
          <ul className={styles.sauce_list}>
            {map(item.sauces, (data) => (
              <li>{data} &ensp; </li>
            ))}
          </ul>
          {item.observation && <label>Observaciones: {item.observation}</label>}
        </div>
      ))}
    </div>
  );
}
