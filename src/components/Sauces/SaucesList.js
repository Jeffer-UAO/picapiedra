import React, { useState } from 'react';

import styles from "./Sauces.module.scss";

export function SaucesList(props) {
  const { id, name, process } = props;
  const [isChecked, setIsChecked] = useState(true);

  const [sauces, setSauces] = useState([]);

  const handleCheckboxChange = (name) => {
    setIsChecked(!isChecked);
    process(name, isChecked);
    console.log(isChecked);
  };

  return (
    <div className={styles.sauce_name}>

      <p>{name}</p>

      <div className={styles.theme_toggle}>
        <input
          type="checkbox"
          id={id}
          className={styles.checkbox}
           checked={isChecked}
          onChange={()=> handleCheckboxChange(name)}

        />
        <label htmlFor={id} className={styles.label}>
          <label>Si</label>
          <label>No</label>
        </label>
      </div>
    </div>
  );
}
