import { Badge, Button, Modal } from "flowbite-react";
import { BsFillTrashFill } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../feature/hook";
import {
  addAmount,
  calculateTotals,
  cartProceed,
  decrement,
  increment,
  removeItem,
} from "../feature/slices/cartSlice";
import { Product } from "../types";
import { useNavigate } from "react-router-dom";
import { useResultForm } from "../utils/useResultForm";
import CustomToast from "./CustomToast";
import { useEffect } from "react";
import { FormatePrice } from "../utils/FormatPrice";

export type CartProps = {
  isOpenCart?: boolean;
  setOpenCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const CartModal: React.FC<CartProps> = ({ isOpenCart, setOpenCart }) => {
  const { cartItems, itemsPrice } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.user);
  const { result, setResult } = useResultForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleProceed = () => {
    if (user) {
      dispatch(cartProceed());
      navigate("/shipping-address");
      return;
    }
    setResult(<CustomToast text="Please login first!!" status="warning" />);
  };

  const onCloseModal = () => {
    return setOpenCart(false);
  };
  console.log();
  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

  return (
    <Modal show={isOpenCart} onClose={() => onCloseModal()}>
      <Modal.Header>My Cart</Modal.Header>
      <Modal.Body>
        {cartItems.length > 0 ? (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {cartItems.map((item: Product) => (
              <CartItem item={item} key={item._id} />
            ))}
          </ul>
        ) : (
          <span>No Items</span>
        )}
      </Modal.Body>
      {result}
      <Modal.Footer className="flex justify-between">
        <h4 className="text-md font-semibold uppercase">
          Items Price: {FormatePrice(itemsPrice)}
        </h4>
        {cartItems.length > 0 && (
          <Button className="uppercase" onClick={() => handleProceed()}>
            proceed
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export const CartItem: React.FC<{ item: Product }> = ({ item }) => {
  const dispatch = useAppDispatch();

  const handleIncrease = (id: string) => {
    dispatch(increment({ id, product: item }));
  };
  const handleDescrease = (id: string) => {
    dispatch(decrement({ id }));
  };
  return (
    <li className="py-3 sm:py-4">
      <div className="flex items-start space-x-4">
        <div className="shrink-0">
          <img
            className="h-20 w-20 rounded-md"
            src={item.image}
            alt={item.name}
          />
        </div>
        <div className="min-w-0 flex-1 space-y-1 ">
          <p className="truncate text-xl font-medium text-gray-900 dark:text-white">
            {item.name}
          </p>
          <p className="truncate text-md text-gray-500 dark:text-gray-400 flex items-center">
            {FormatePrice(item.price)}
          </p>
          {item.shippingPrice > 0 && (
            <Badge className="w-fit">{FormatePrice(item.shippingPrice)}</Badge>
          )}
        </div>
        <div className="flex flex-col items-end space-y-3 text-base font-semibold text-gray-900 dark:text-white">
          <div className="flex items-center text-center border border-gray-400 rounded-md">
            <span
              onClick={() => handleIncrease(item._id)}
              className="text-xl cursor-pointer w-6"
            >
              +
            </span>
            <input
              type="number"
              className="w-10 h-full mx-1 border-t-0 border-b-0 text-center"
              min="0"
              value={item.quantity}
              onChange={(e) =>
                dispatch(
                  addAmount({
                    id: item._id,
                    amount: Number(e.target.value),
                    product: item,
                  })
                )
              }
            />
            <span
              onClick={() => handleDescrease(item._id)}
              className="text-xl cursor-pointer w-6"
            >
              -
            </span>
          </div>
          <div className="flex items-center">
            <span>
              {item.quantity && FormatePrice(item.quantity * item.price)}
            </span>
            <span
              onClick={() => dispatch(removeItem({ id: item._id }))}
              className="text-red-600 cursor-pointer ml-2"
            >
              <BsFillTrashFill />
            </span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartModal;
