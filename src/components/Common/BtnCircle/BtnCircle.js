import React from "react";

import styles from "./BtnCircle.module.scss";

import { AiOutlineMinusCircle, AiFillPlusCircle } from "react-icons/ai";

export function BtnCircle(props) {
  const {f, color, btnType } = props;
  return (
    <div className={styles.btn_circle}>
      {btnType === "minus" ? (
        <AiOutlineMinusCircle onClick={()=>f(-1)} size={30} color={color} />
      ) : (
        <AiFillPlusCircle onClick={()=>f(1)} size={30} color={color} />
      )}
    </div>
  );
}
