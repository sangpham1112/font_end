import CreateProductModal from "./CreateProductModal";
import DeleteProductModal from "./DeleteProductModal";
import TableProudct from "./TableProudct";

const AdminProducts: React.FC = () => {
  return (
    <>
      {/* Start block */}
      <TableProudct />
      {/* End block */}
      <CreateProductModal />
      {/* drawer component */}
      {/* Delete Modal */}
      <DeleteProductModal />
    </>
  );
};

export default AdminProducts;
