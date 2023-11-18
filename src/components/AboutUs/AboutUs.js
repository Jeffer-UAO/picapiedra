import styles from "./AboutUs.module.scss";

export function AboutUs() {
  return (
    <div className={styles.container}>
      <div className={styles.about}>
        <h1>Nosotros</h1>
        <p>
                  Distribuidora Duque es una empresa comprometida con la excelencia en
          la moda, dedicada a la distribución de ropa de alta calidad. Nuestra
          pasión por la moda y nuestro compromiso con la satisfacción del
          cliente nos distinguen en el mercado. Con años de experiencia en la
          industria de la moda, nos enorgullece ofrecer a nuestros clientes una
          amplia gama de prendas hermosas y asequibles que reflejan la última
          tendencia y calidad superior.
        </p>
      </div>

      <div className={styles.mision}>
        <h5>Misión</h5>
        <p>
          Nuestra misión en Distribuidora Duque es vestir a nuestros clientes
          con prendas de alta calidad que no solo realcen su estilo personal,
          sino que también les permitan expresarse de manera única. Nos
          esforzamos por brindar a nuestros clientes acceso a ropa hermosa y
          asequible que combine con sus vidas ocupadas y en constante cambio.
          Trabajamos incansablemente para mantenernos a la vanguardia de la moda
          y proporcionar un servicio excepcional, garantizando que cada cliente
          se sienta especial y satisfecho con su elección de vestimenta.
        </p>
      </div>

      <div className={styles.vision}>
        <h5>Visión</h5>
        <p>
          En Distribuidora Duque, nuestra visión es convertirnos en líderes
          indiscutibles en la distribución de ropa de alta calidad, reconociendo
          la importancia de la moda como una forma de empoderamiento y expresión
          personal. Queremos ser la primera elección de los clientes cuando
          busquen prendas de calidad excepcional a precios asequibles. Estamos
          comprometidos con la innovación constante y la expansión de nuestra
          gama de productos para satisfacer las necesidades cambiantes de
          nuestros clientes. Al mirar hacia el futuro, nos vemos como una marca
          de confianza y un referente en el mundo de la moda, contribuyendo a la
          autoestima y la confianza de las personas a través de la ropa que
          ofrecemos.
        </p>
      </div>

      <div className={styles.phone}>
        <h5>Líneas de atención</h5>
        <ul>
     
          <li>(+57) 315 428 0399</li>
       
        </ul>
      </div>

      <div className={styles.adress}>
        <h5>Ubicación:</h5>
        <p>Calle 11 # 9 - 20 Cali – Valle</p>
      </div>
    </div>
  );
}
