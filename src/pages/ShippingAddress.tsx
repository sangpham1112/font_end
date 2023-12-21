import { Button } from "flowbite-react";
import { useUpdateFormHook } from "../utils/useUpdateFormHook";
import { useAppDispatch, useAppSelector } from "../feature/hook";
import { handleContinute } from "../feature/slices/currentOrderSlice";
import { useNavigate } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";

const Stepper = lazy(() => import("../components/Stepper"));
const InputElement = lazy(() => import("../components/InputElement"));
const Layout = lazy(() => import("../components/Layout"));

const ShippingAddress: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);
  const ShippingAdresState = {
    fullName: "",
    phone: "",
    address: "",
  };
  const { onUpdate, setFirstValue, formValues } =
    useUpdateFormHook(ShippingAdresState);

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(handleContinute(formValues));
    setFirstValue();
    navigate("/place-order");
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <Suspense>
      <Layout>
        <div className="mx-auto max-w-6xl m-10">
          <div className="max-w-xl mx-auto">
            <Stepper />
          </div>
          <form
            className="mt-10 max-w-lg border border-gray-300 mx-auto p-3 rounded-md"
            onSubmit={onSubmit}
          >
            <InputElement
              Label="Name"
              Type="text"
              Key="fullName"
              onUpdateFunc={onUpdate}
            />
            <InputElement
              Label="Address"
              Type="text"
              Key="address"
              onUpdateFunc={onUpdate}
            />
            <InputElement
              Label="Phone"
              Type="text"
              Key="phone"
              onUpdateFunc={onUpdate}
            />
            <Button className="uppercase w-full my-2" type="submit">
              continute
            </Button>
          </form>
        </div>
      </Layout>
    </Suspense>
  );
};

export default ShippingAddress;
