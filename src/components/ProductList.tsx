import { Product } from "../types";
import CardItem from "./CardItem";

const ProductList: React.FC<{ currentProductList: Product[] }> = ({
  currentProductList,
}) => {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-2 lg:grid-cols-3">
      {currentProductList?.map((item: Product) => (
        <CardItem item={item} key={item._id} />
      ))}
    </div>
  );
};

export default ProductList;
