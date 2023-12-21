import Loading from "../../../../components/Loading";
import {
  useDeleteOrderByIdMutation,
  useGetAllOrdersQuery,
} from "../../../../feature/api/apiOrderSlice";
import { useAppDispatch, useAppSelector } from "../../../../feature/hook";
import { GetOrderCheckedBoxes } from "../../../../feature/slices/adminSlice";
import {
  GetCurrentReview,
  OpenPreviewModal,
} from "../../../../feature/slices/adminSlice";
import { Product } from "../../../../types";
import SelectUpdateStatus from "./SelectUpdateStatus";
import { useState } from "react";

const AdminOrders = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const {
    data: orders,
    isLoading,
    isError,
  } = useGetAllOrdersQuery(user?.token!);
  const [deleteOrderById] = useDeleteOrderByIdMutation();

  const orderLength = orders?.length;
  const [checkedState, setCheckedState] = useState(
    new Array(orderLength).fill(false)
  );

  const handleDeleteOrder = (id: string) => {
    const data = {
      id: id,
      token: user?.token,
    };
    deleteOrderById(data);
  };

  const handleChange = (position: number) => {
    if (!orders) {
      return;
    }
    const updatedCheckedState = checkedState.map((item: any, index: number) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
    const ChosenOrders = updatedCheckedState
      .map((currentState: any, index: number) => {
        if (currentState === true) {
          return orders[index]._id;
        }
      })
      .filter(Boolean);
    dispatch(GetOrderCheckedBoxes(ChosenOrders));
  };

  const handleOpenPreviewModal = (orderItems: Product[]) => {
    dispatch(GetCurrentReview(orderItems));
    dispatch(OpenPreviewModal());
  };

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <span>something went wrong!</span>;
  }
  return (
    <div className="m-3">
      {checkedState.filter(Boolean).length > 0 && <SelectUpdateStatus />}
      <table className="w-full divide-y divide-gray-200 max-w-fit">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            ></th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Customer
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Address
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Price
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            ></th>
            {/* Thêm các tiêu đề cột khác */}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders?.map((order, index) => {
            return (
              <tr key={order._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" onChange={() => handleChange(index)} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{order._id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {order.shippingAddress.fullName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {order.shippingAddress.address}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    ${order.totalPrice}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{order.status}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-3">
                  <div
                    onClick={() => handleDeleteOrder(order._id)}
                    className="text-md capitalize font-semibold text-red-900 cursor-pointer hover:underline"
                  >
                    delete
                  </div>
                  <button
                    type="button"
                    onClick={() => handleOpenPreviewModal(order.orderItems)}
                    className="ml-2 bg-blue-500 font-semibold uppercase rounded-md p-2 text-white"
                  >
                    review
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
