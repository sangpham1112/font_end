import { Button } from "flowbite-react";
import { useAppDispatch, useAppSelector } from "../feature/hook";
import { useUpdateUserMutation } from "../feature/api/apiUserSlice";
import { useUpdateFormHook } from "../utils/useUpdateFormHook";
import { useResultForm } from "../utils/useResultForm";
import { UserLogOut } from "../feature/slices/userSlice";
import { lazy, Suspense } from "react";

const Layout = lazy(() => import("../components/Layout"));
const InputElement = lazy(() => import("../components/InputElement"));
const CustomToast = lazy(() => import("../components/CustomToast"));

const UserSetting: React.FC = () => {
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const { result, setResult } = useResultForm();
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const initialUserInfor = {
    token: user?.token,
    _id: user?._id,
    email: user?.email,
    password: "",
    confirmPassword: "",
    name: user?.name,
  };

  const { formValues, onUpdate, setFirstValue } =
    useUpdateFormHook(initialUserInfor);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { confirmPassword, ...userInfor } = formValues;
    if (confirmPassword !== userInfor.password) {
      setResult(
        <CustomToast text="password is not the same" status="warning" />
      );
    } else {
      setResult(<CustomToast text="updated success!" status="success" />);
      updateUser(userInfor);
    }
    setFirstValue();
    setTimeout(() => {
      dispatch(UserLogOut());
    }, 2000);
  };

  return (
    <Suspense>
      <Layout>
        <div className="h-screen flex items-center justify-center flex-col">
          {result}
          <h3 className="text-3xl text-center uppercase font-bold mb-5">
            User setting
          </h3>

          <form
            className="border border-gray-300 p-3 w-96 rounded-md"
            onSubmit={handleSubmit}
          >
            <InputElement
              Type="text"
              Label="Name"
              onUpdateFunc={onUpdate}
              Key="name"
              Value={formValues.name}
            />
            <InputElement
              Type="email"
              Label="Email"
              onUpdateFunc={onUpdate}
              Value={formValues.email}
            />
            <InputElement
              Type="password"
              Label="Password"
              onUpdateFunc={onUpdate}
              Value={formValues.password}
              Key="password"
            />
            <InputElement
              Type="password"
              Label="Confirm Password"
              onUpdateFunc={onUpdate}
              Value={formValues.confirmPassword}
              Key="confirmPassword"
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              Update
            </Button>
          </form>
        </div>
      </Layout>
    </Suspense>
  );
};

export default UserSetting;
