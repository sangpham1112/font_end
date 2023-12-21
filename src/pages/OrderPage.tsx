import { useGetUserOrdersQuery } from "../feature/api/apiOrderSlice";
import { useAppSelector } from "../feature/hook";
import { lazy, Suspense } from "react";

const Loading = lazy(() => import("../components/Loading"));
const OrdersTable = lazy(() => import("../components/OrdersTable"));
const Layout = lazy(() => import("../components/Layout"));

const OrderPage: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const { data: orders, isLoading, isError } = useGetUserOrdersQuery(user!);
  let content;
  if (isLoading) {
    content = <Loading />;
  }
  if (isError) {
    content = <span>something went wrong</span>;
  }
  if (orders) {
    content =
      orders.length > 0 ? (
        <OrdersTable orders={orders} />
      ) : (
        <div className="h-screen flex items-center justify-center">
          <span className="text-6xl font-bold ">No Order</span>
        </div>
      );
  }

  return (
    <Suspense>
      <Layout>{content}</Layout>
    </Suspense>
  );
};

export default OrderPage;
