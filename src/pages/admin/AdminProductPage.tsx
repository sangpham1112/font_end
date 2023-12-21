import { lazy, Suspense } from "react";

const AdminLayout = lazy(() => import("./components/AdminLayoutComponent"));
const AdminProducts = lazy(() => import("./components/products/AdminProducts"));

const AdminProductPage: React.FC = () => {
  return (
    <Suspense>
      <AdminLayout>
        <AdminProducts />
      </AdminLayout>
    </Suspense>
  );
};

export default AdminProductPage;
