import { AiOutlineShoppingCart } from "react-icons/ai";
import { useState } from "react";
import { Dropdown, Avatar, Button } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import CartModal, { CartProps } from "./CartModal";
import { useAppDispatch, useAppSelector } from "../feature/hook";
import { removeAllCart } from "../feature/slices/cartSlice";
import { UserLogOut } from "../feature/slices/userSlice";
import { InputSearchBar } from "./InputSearchBar";

const NavBar: React.FC = () => {
  const [isOpenCart, setOpenCart] = useState(false);

  return (
    <nav className="py-3 md:py-8 border-b-2">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <Link className="hidden md:block text-4xl font-bold uppercase" to={"/"}>
          sangstore
        </Link>
        <InputSearchBar />
        <LoginAndCart setOpenCart={setOpenCart} />
        <CartModal isOpenCart={isOpenCart} setOpenCart={setOpenCart} />
      </div>
    </nav>
  );
};

export const LoginAndCart: React.FC<CartProps> = ({ setOpenCart }) => {
  const { amount } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(UserLogOut());
    dispatch(removeAllCart());
    navigate("/");
  };
  const handleSetting = () => {
    navigate("/user-setting");
  };

  const handleMyOrder = () => {
    navigate("/my-order/" + user?._id);
  };

  const handleDashboard = () => {
    navigate("/dashboard/products");
  };

  return (
    <div className="flex items-center max-w-fit relative">
      {!user ? (
        <Button color="success" pill={true}>
          <Link to={"/login"}>Sign up</Link>
        </Button>
      ) : (
        <Dropdown
          arrowIcon={false}
          inline={true}
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded={true}
            />
          }>
          <Dropdown.Header>
            <span className="block text-sm">{user.name}</span>
            <span className="block truncate text-sm font-medium">
              {user.email}
            </span>
          </Dropdown.Header>
          {user.isAdmin === true && (
            <Dropdown.Item onClick={() => handleDashboard()}>
              Dashboard
            </Dropdown.Item>
          )}
          <Dropdown.Item onClick={() => handleSetting()}>
            Settings
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleMyOrder()}>
            My Orders
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={() => handleLogout()}>Sign out</Dropdown.Item>
        </Dropdown>
      )}
      <span
        className="text-3xl ml-3 cursor-pointer"
        onClick={() => setOpenCart(true)}>
        <AiOutlineShoppingCart />
      </span>
      <span className="absolute text-white right-0 bottom-1 rounded-full px-1 text-xs bg-yellow-400">
        {amount}
      </span>
    </div>
  );
};

export default NavBar;
