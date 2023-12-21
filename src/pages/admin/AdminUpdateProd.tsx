import { lazy, Suspense } from "react";

const AdminLayout = lazy(() => import("./components/AdminLayoutComponent"));
const UpdateProduct = lazy(() => import("./components/products/UpdateProduct"));

const AdminUpdateProd: React.FC = () => {
  return (
    <Suspense>
      <AdminLayout>
        <UpdateProduct />
      </AdminLayout>
    </Suspense>
  );
};

export default AdminUpdateProd;
