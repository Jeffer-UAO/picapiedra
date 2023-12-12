import styles from "./AboutUs.module.scss";

export function AboutUs() {
  return (
    <div className={styles.container}>
      <div className={styles.about}>
        <h1>Nosotros</h1>
        <p>
                 
        </p>
      </div>

      <div className={styles.mision}>
        <h5>Misión</h5>
        <p>
         
        </p>
      </div>

      <div className={styles.vision}>
        <h5>Visión</h5>
        <p>
        
        </p>
      </div>

      <div className={styles.phone}>
        <h5>Líneas de atención</h5>
        <ul>
     
          <li>(+57)</li>
       
        </ul>
      </div>

      <div className={styles.adress}>
        <h5>Ubicación:</h5>
        <p> Cali – Valle</p>
      </div>
    </div>
  );
}
