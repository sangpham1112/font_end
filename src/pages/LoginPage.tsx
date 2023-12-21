import { Link, useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import { useAppDispatch } from "../feature/hook";
import { LoggingUser } from "../feature/slices/userSlice";
import { useUpdateFormHook } from "../utils/useUpdateFormHook";
import { useLoginMutation } from "../feature/api/apiUserSlice";
import { lazy, Suspense } from "react";

const Layout = lazy(() => import("../components/Layout"));
const InputElement = lazy(() => import("../components/InputElement"));

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const initialUserInfor = {
    email: "",
    password: "",
  };
  const { formValues, onUpdate, setFirstValue } =
    useUpdateFormHook(initialUserInfor);

  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const user = await login(formValues).unwrap();
      dispatch(LoggingUser(user));
    } catch (error) {
      console.log(error);
    }
    setFirstValue();
    navigate("/");
  };
  return (
    <Suspense>
      <Layout>
        <div className="h-screen flex items-center justify-center">
          <form
            className="border border-gray-300 p-5 w-96"
            onSubmit={handleSubmit}
          >
            <h3 className="text-xl font-bold">Login</h3>
            <InputElement
              Label="Email"
              Type="email"
              PlaceHolder="Email"
              onUpdateFunc={onUpdate}
              Key="email"
              Value={formValues.email}
            />
            <InputElement
              Label="Password"
              Type="password"
              PlaceHolder="Password"
              onUpdateFunc={onUpdate}
              Key="password"
              Value={formValues.password}
            />
            <Button type="submit" disabled={isLoading}>
              Login
            </Button>
            <h5 className="text-sm mt-2">
              Don't have account ?{" "}
              <Link className="text-blue-700" to={"/register"}>
                Register here
              </Link>
            </h5>
          </form>
        </div>
      </Layout>
    </Suspense>
  );
};

export default LoginPage;
