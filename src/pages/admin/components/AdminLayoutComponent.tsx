import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../feature/hook";
import { removeAllCart } from "../../../feature/slices/cartSlice";
import { UserLogOut } from "../../../feature/slices/userSlice";
import AdminSideBar from "./AdminSideBarComponent";

const AdminLayout = ({ children }: any) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(UserLogOut());
    dispatch(removeAllCart());
    navigate("/");
  };

  return (
    <>
      <div className="flex justify-between items-center bg-gray-800 text-white py-4 px-6">
        <div className="font-bold text-lg">Admin Dashboard</div>
        <button
          onClick={() => handleLogout()}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 px-4"
        >
          Log out
        </button>
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-2">
          <AdminSideBar />
        </div>
        <div className="col-span-10">{children}</div>
      </div>
    </>
  );
};

export default AdminLayout;
