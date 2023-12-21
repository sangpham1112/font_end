import { Button, Card } from "flowbite-react";
import { useAppDispatch, useAppSelector } from "../feature/hook";
import { useEffect } from "react";
import {
  handlePlaceOrder,
  resetProcess,
} from "../feature/slices/currentOrderSlice";
import { useNavigate } from "react-router-dom";
import { useResultForm } from "../utils/useResultForm";
import { useCreateOrderMutation } from "../feature/api/apiOrderSlice";
import { removeAllCart } from "../feature/slices/cartSlice";
import { lazy, Suspense } from "react";
import { FormatePrice } from "../utils/FormatPrice";

const Stepper = lazy(() => import("../components/Stepper"));
const CustomToast = lazy(() => import("../components/CustomToast"));
const Layout = lazy(() => import("../components/Layout"));

const PlaceOrderPage: React.FC = () => {
  const { shippingAddress, stepDone } = useAppSelector(
    (state) => state.currentOrder
  );
  const { cartItems, itemsPrice, amount, shippingFee } = useAppSelector(
    (state) => state.cart
  );
  const dispatch = useAppDispatch();
  const { result, setResult } = useResultForm();
  const navigate = useNavigate();
  const [createOrder] = useCreateOrderMutation();
  const { user } = useAppSelector((state) => state.user);

  const order = {
    orderItems: cartItems,
    shippingAddress: shippingAddress,
    itemsPrice: itemsPrice,
    shippingPrice: shippingFee,
    totalPrice: itemsPrice + shippingFee,
    user: user!,
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(handlePlaceOrder());
    createOrder(order);
    setResult(
      <CustomToast text="you ordered successfully!!" status="success" />
    );
  };
  useEffect(() => {
    if (stepDone === 3) {
      const timer = setTimeout(() => {
        dispatch(resetProcess());
        navigate("/my-order/" + user?._id);
        dispatch(removeAllCart());
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [stepDone, dispatch]);

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping-address");
    }
  }, [shippingAddress]);

  return (
    <Suspense>
      <Layout>
        <div className="max-w-3xl mx-auto m-4 h-auto">
          <Stepper />
          <h3 className="text-2xl uppercase font-bold my-4">place order</h3>
          <div className="grid grid-cols-5 gap-2">
            <div className="col-span-3 space-y-3">
              <Card className="">
                <h3 className="text-xl uppercase font-bold">
                  shipping address
                </h3>
                <ul className="space-y-2">
                  <li>
                    <span className="font-semibold">Name: </span>{" "}
                    {shippingAddress.fullName}
                  </li>
                  <li>
                    <span className="font-semibold">Address: </span>{" "}
                    {shippingAddress.address}
                  </li>

                  <li>
                    <span className="font-semibold">Phone: </span>{" "}
                    {shippingAddress.phone}
                  </li>
                </ul>
              </Card>
              <Card>
                <h3 className="text-xl uppercase font-bold">
                  cart items ({amount})
                </h3>
                <ul className="divide-y divide-slate-200">
                  {cartItems.map((item) => {
                    return (
                      <li
                        className="flex items-start justify-between py-3 first:pt-0 last:pb-0"
                        key={item._id}
                      >
                        <img
                          src={item.image}
                          className="w-20 h-20 rounded-md "
                        />
                        <div className="flex flex-col flex-1 justify-between ml-3 space-y-2">
                          <h4 className="text-md font-semibold">{item.name}</h4>
                          <p className="text-sm text-gray-500">
                            {FormatePrice(item.price)} x {item.quantity} (ship
                            fee: {FormatePrice(item.shippingPrice)})
                          </p>
                          <p className="text-sm text-gray-500">
                            <span className="font-semibold text-gray-800">
                              Category:
                            </span>{" "}
                            {item.category}
                          </p>
                        </div>
                        <h3 className="text-xl font-semibold">
                          {item.quantity &&
                            FormatePrice(item.price * item.quantity)}
                        </h3>
                      </li>
                    );
                  })}
                </ul>
              </Card>
            </div>
            <div className="col-span-2">
              <Card>
                <h3 className="text-xl uppercase font-bold">place order</h3>
                <form className="space-y-2" onSubmit={handleSubmit}>
                  <dl className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                    <div className="flex flex-col pb-3">
                      <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                        Items Price:
                      </dt>
                      <dd className="text-md font-semibold">
                        {FormatePrice(itemsPrice)}
                      </dd>
                    </div>
                    <div className="flex flex-col py-3">
                      <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                        Shipping Price:
                      </dt>
                      <dd className="text-md font-semibold">
                        {FormatePrice(shippingFee)}
                      </dd>
                    </div>
                    <div className="flex flex-col pt-3">
                      <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                        Total Price:
                      </dt>
                      <dd className="text-md font-semibold">
                        {FormatePrice(itemsPrice + shippingFee)}
                      </dd>
                    </div>
                  </dl>
                  <Button
                    className="w-full uppercase my-1"
                    color="warning"
                    type="submit"
                    disabled={stepDone === 3 ? true : false}
                  >
                    place order
                  </Button>
                </form>
              </Card>
              {result}
            </div>
          </div>
        </div>
      </Layout>
    </Suspense>
  );
};

export default PlaceOrderPage;
