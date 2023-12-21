import { useUpdateOrderStatusMutation } from "../../../../feature/api/apiOrderSlice";
import { useAppSelector } from "../../../../feature/hook";
import { useState } from "react";

const SelectUpdateStatus = () => {
  const { orderCheckedBoxes } = useAppSelector((state) => state.admin);
  const { user } = useAppSelector((state) => state.user);
  const [currentStatus, setCurrentStatus] = useState("pending");
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const handleUpdate = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (orderCheckedBoxes !== null && user?.token !== undefined) {
      const data = {
        orderCheckedBoxes: orderCheckedBoxes,
        status: currentStatus,
        token: user?.token,
      };
      updateOrderStatus(data);
    }
  };

  return (
    <form className="flex my-2 justify-end" onSubmit={handleUpdate}>
      <select
        value={currentStatus}
        onChange={(e) => setCurrentStatus(e.target.value)}
        className="border border-gray-300 rounded-md capitalize"
      >
        <option value="pending">pending</option>
        <option value="return">return</option>
        <option value="in progress">in progress</option>
        <option value="delivered">delivered</option>
      </select>
      <button
        type="submit"
        className="ml-2 bg-blue-500 font-semibold uppercase rounded-md p-2 text-white"
      >
        update
      </button>
    </form>
  );
};

export default SelectUpdateStatus;
