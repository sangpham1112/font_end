import { Badge, Button } from "flowbite-react";
import Stars from "./Stars";
import { Product } from "../types";
import { useAppDispatch, useAppSelector } from "../feature/hook";
import { addToCart } from "../feature/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const ProductInfor: React.FC<{ product: Product }> = ({ product }) => {
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector((state) => state.cart);
  const navigate = useNavigate();

  const handleAddToCart = (item: Product) => {
    const existItem = cartItems.find((x) => x._id === item._id);
    const quantity =
      existItem && existItem.quantity ? existItem.quantity + 1 : 1;

    if (item.countInStock < quantity) {
      alert("Sorry. Product is out of stock");
      return;
    }
    dispatch(addToCart({ ...item, quantity: quantity }));
  };

  const ClickSearchBrand = (brand: string) => {
    navigate("/search/?brand=" + brand);
  };

  const ClickSearchCate = (category: string) => {
    navigate("/search/?category=" + category);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-3 items-start m-2">
      <div className="col-span-3">
        <img
          className="rounded-md w-full h-full max-h-96"
          src={product.image}
          alt={product.name}
        />
      </div>
      <div className="col-span-3 space-y-2 p-4 capitalize">
        <h3 className="text-2xl font-semibold"> {product.name}</h3>
        <div className="flex items-center space-x-1">
          {product.previousPrice > 0 && (
            <h4 className="text-md line-through text-gray-500">
              ${product.previousPrice}
            </h4>
          )}
          <h4 className="text-2xl font-medium">${product.price}</h4>
          {product.shippingPrice > 0 && (
            <Badge>${product.shippingPrice} (Ship)</Badge>
          )}
        </div>
        <p className="text-md">
          <span className="text-md font-bold capitalize">description:</span>{" "}
          {product.description}
        </p>
        <p className="text-md font-semibold">
          <span className="font-bold">Category:</span>{" "}
          <span
            className=" cursor-pointer hover:text-blue-500"
            onClick={() => ClickSearchCate(product.category)}
          >
            {product.category}
          </span>
        </p>
        <p className="text-md font-semibold">
          <span className="font-bold">Brand:</span>{" "}
          <span
            className=" cursor-pointer hover:text-blue-500"
            onClick={() => ClickSearchBrand(product.brand)}
          >
            {product.brand}
          </span>
        </p>
        {product.countInStock > 0 ? (
          <Badge className="uppercase w-fit mb-2" color="success">
            InStock ({product.countInStock})
          </Badge>
        ) : (
          <Badge className="w-fit uppercase" color="dark">
            not available
          </Badge>
        )}
        <Stars starNum={product.rating}>
          <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
            ({product.rating.toFixed(2)}/5)
          </p>
          <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
          <span className="text-sm font-medium text-gray-900 underline dark:text-white">
            {product.numReviews} reviews
          </span>
        </Stars>
        {product.countInStock > 0 ? (
          <Button
            className="uppercase w-fit"
            color="dark"
            onClick={() => handleAddToCart(product)}
          >
            Add to cart
          </Button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ProductInfor;
