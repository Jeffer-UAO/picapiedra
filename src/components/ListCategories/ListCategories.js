import { CardImg, CardTitle } from "reactstrap";
import { map } from "lodash";
import { BASE_NAME } from "@/config/constants";
import Link from "next/link";

import styles from "./ListCategories.module.scss";

export function ListCategories(props) {
  const { categories } = props;

  return (
      <div className={styles.content}>   
       <h4>CATEGORIAS</h4>
        <div className={styles.list}>
          {map(categories, (category) => (
            <div key={category.id} className={styles.card}>
              {category.image ? (
                <Link href={`/products/${category.slug}`}>
                  <CardImg
                    alt="Card image cap"
                    src={BASE_NAME + category.image}
                  />
                  <div className={styles.category}>
                    <CardTitle className={styles.title}>
                      <p>{category.name}</p>                  
                    </CardTitle>
                  </div>
                </Link>
              ) : (
                <Link href={`/products/${category.slug}`}>
                  <CardImg alt="Card image cap" src={category.image_alterna} />

                  <div className={styles.category}>
                    <CardTitle className={styles.title}>
                      <p>{category.name}</p>                    
                    </CardTitle>
                  </div>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
  );
}
