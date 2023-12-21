import { useNavigate } from "react-router-dom";
import {
  useDeleteOrderByIdMutation,
  usePayOrderMutation,
} from "../feature/api/apiOrderSlice";
import { useAppSelector } from "../feature/hook";
import { Order, Product } from "../types";
import { FormatDate } from "../utils/FormatDate";

const OrdersTable: React.FC<{ orders: Order[] }> = ({ orders }) => {
  const { user } = useAppSelector((state) => state.user);
  const [deleteOrderById] = useDeleteOrderByIdMutation();
  const [payOrder] = usePayOrderMutation();
  const navigate = useNavigate();

  const handleOrder = (id: string, action: "pay" | "delete") => {
    const inputData = {
      id: id,
      token: user?.token,
    };
    if (action === "delete") {
      deleteOrderById(inputData);
      return;
    }
    payOrder(inputData)
      .unwrap()
      .then(() => navigate("/my-order/" + user?._id));
  };

  const OrderItem = ({ item }: any) => {
    return (
      <li className="sm:pb-1">
        <div className="flex items-start">
          <div className="flex-shrink-0"></div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              {item.name}
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
              ${item.price} x {item.quantity}
            </p>
          </div>
        </div>
      </li>
    );
  };

  return (
    <>
      <h3 className="text-2xl capitalize text-center my-10 font-bold ">
        My order
      </h3>
      <div className="h-fit max-w-5xl mx-auto min-h-screen">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs text-gray-300 uppercase bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Products
                </th>
                <th scope="col" className="px-6 py-3">
                  address
                </th>
                <th scope="col" className="px-6 py-3">
                  Payment
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Price
                </th>
                <th scope="col" className="px-6 py-3">
                  status
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Delete</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                return (
                  <tr
                    key={order._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                        {order.orderItems.map((item: Product) => (
                          <OrderItem item={item} key={item._id} />
                        ))}
                      </ul>
                    </th>
                    <td className="px-6 py-4">
                      {order.shippingAddress.address}
                    </td>
                    <td className="px-6 py-4">
                      {order.paidAt ? FormatDate(order.paidAt) : "No"}
                    </td>
                    <td className="px-6 py-4">${order.totalPrice}</td>
                    <td className="px-6 py-4 capitalize">{order.status}</td>
                    <td className="px-6 py-4 text-right">
                      {order.isPaid ? (
                        "Paid"
                      ) : (
                        <span
                          onClick={() => handleOrder(order._id, "pay")}
                          className=" cursor-pointer font-medium text-blue-600 hover:underline"
                        >
                          Pay
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {order.isPaid ? (
                        ""
                      ) : (
                        <span
                          className=" cursor-pointer font-medium text-red-600 hover:underline"
                          onClick={() => handleOrder(order._id, "delete")}
                        >
                          Delete
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default OrdersTable;
