import { Button } from "flowbite-react";
import { useRegisterUserMutation } from "../feature/api/apiUserSlice";
import { useNavigate } from "react-router-dom";
import { useUpdateFormHook } from "../utils/useUpdateFormHook";
import { lazy, Suspense } from "react";

const InputElement = lazy(() => import("../components/InputElement"));
const Layout = lazy(() => import("../components/Layout"));

const RegisterPage: React.FC = () => {
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();

  const initialUserInfor = {
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  };
  const { onUpdate, formValues, setFirstValue } =
    useUpdateFormHook(initialUserInfor);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { confirmPassword, ...userInfor } = formValues;
    registerUser(userInfor);
    setFirstValue();
    navigate("/login");
  };

  return (
    <Suspense>
      <Layout>
        <div className="h-screen flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="border border-gray-300 p-5 w-96 max-wf"
          >
            <h3 className="text-xl font-bold">Register</h3>
            <InputElement
              onUpdateFunc={onUpdate}
              Key="email"
              Value={formValues.email}
              Label="Email"
              Type="email"
              PlaceHolder="Email"
            />
            <InputElement
              onUpdateFunc={onUpdate}
              Key="name"
              Value={formValues.name}
              Label="Name"
              Type="text"
              PlaceHolder="Full Name"
            />
            <InputElement
              Label="Password"
              Type="password"
              PlaceHolder="Password"
              Key="password"
              Value={formValues.password}
              onUpdateFunc={onUpdate}
            />
            <InputElement
              Label="Confirm Password"
              Type="password"
              PlaceHolder="Confirm Password"
              Key="confirmPassword"
              Value={formValues.confirmPassword}
              onUpdateFunc={onUpdate}
            />
            <Button type="submit" disabled={isLoading}>
              Register
            </Button>
          </form>
        </div>
      </Layout>
    </Suspense>
  );
};

export default RegisterPage;
