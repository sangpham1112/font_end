import AdminLayout from "./components/AdminLayoutComponent";
import AdminOrders from "./components/orders/AdminOrders";
import ReviewOrderItemsModal from "./components/orders/ReviewOrderItemsModal";

const AdminOrderPage: React.FC = () => {
  return (
    <AdminLayout>
      <AdminOrders />
      <ReviewOrderItemsModal />
    </AdminLayout>
  );
};

export default AdminOrderPage;
