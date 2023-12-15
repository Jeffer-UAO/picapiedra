import { size } from "lodash";
import { Listproducts, Footer, NotFound, FooterApp, Redes } from "@/components";

export default function category(props) {
  const { products, category } = props;
  const hasProduct = size(products) > 0;

  return (
    <div>
  <Redes />
      {hasProduct ? (
        <Listproducts products={products} title={category.name} />
      ) : (
        <NotFound
          title={"Upppss... No hay productos para mostrar en esta categoría"}
        />
      )}
      <FooterApp />
      <Footer />
    </div>
  );
}
