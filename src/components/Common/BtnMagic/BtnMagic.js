import React from 'react'

import styles from "./BtnMagic.module.scss";
import { Button } from 'reactstrap';

export function BtnMagic() {
  return (
    <div className={styles.btn_magic}>
      <Button color='warning'>
        Todas
      </Button>
    </div>
  )
}
