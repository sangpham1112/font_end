import { Badge } from "flowbite-react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../feature/hook";
import Stars from "./Stars";
import { Product } from "../types";
import { addToCart } from "../feature/slices/cartSlice";
import { FormatePrice } from "../utils/FormatPrice";

const CardItem: React.FC<any> = ({ item }) => {
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

  const NavigateCategory = (category: string) => {
    navigate("?category=" + category);
  };

  return (
    <div className="col-span-1 capitalize" key={item.id}>
      <img
        className="rounded-t-lg h-full w-full max-h-60"
        src={item.image}
        alt={item.name}
      />
      <div className="bg-white border border-gray-200 shadow p-2.5 space-y-2">
        <div className="flex text-xs md:text-md mr-3 items-center my-1 justify-between">
          <div>
            {Stars({ starNum: item.rating })}
            <span className="text-xs space-x-2 font-semibold">
              {item.rating > 0 ? (
                `${item.rating.toFixed(2)}/5.0`
              ) : (
                <span className="text-xs rounded-sm bg-gray-200 p-1 ">
                  no review
                </span>
              )}
            </span>
          </div>
          <span
            onClick={() => NavigateCategory(item.category)}
            className=" text-white bg-green-500 hover:bg-green-600 p-1 w-fit font-bold rounded-sm text-sm cursor-pointer">
            {item.category}
          </span>
        </div>
        <Link
          to={"/product/" + item.slug}
          className="cursor-pointer text-md hover:text-blue-500 lg:text-xl font-semibold tracking-tight text-gray-900">
          {item.name}
        </Link>

        <div className="flex items-center justify-between">
          {item.previousPrice > 0 && (
            <h4 className="text-sm line-through text-gray-500 mr-2">
              {FormatePrice(item.previousPrice)}
            </h4>
          )}
          <h4 className="text-md lg:text-xl font-medium flex-1">
            {FormatePrice(item.price)}
          </h4>
          {item.countInStock > 0 && (
            <span
              onClick={() => handleAddToCart(item)}
              className="text-xl text-slate-500 cursor-pointer hover:text-white hover:bg-blue-600 rounded-full p-2">
              <AiOutlineShoppingCart />
            </span>
          )}
        </div>
        <div className="flex items-center justify-between">
          {!item.shippingPrice ? (
            <span className="bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-indigo-400 border border-indigo-400">
              Free ship
            </span>
          ) : (
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Shipping Fee: </span>
              {FormatePrice(item.shippingPrice)}
            </p>
          )}
          {item.countInStock > 0 ? (
            <Badge className=" text-sm text-green-500 w-fit" color="success">
              instock ({item.countInStock})
            </Badge>
          ) : (
            <Badge className=" text-sm  w-fit" color="dark">
              not available
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardItem;
