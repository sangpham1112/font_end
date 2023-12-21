import { useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import CardItem from "../components/CardItem";
import { Product } from "../types";
import { useGetProductBySearchQuery } from "../feature/api/apiProductSlice";
import Loading from "../components/Loading";
import NotFound from "../components/404";

const ProductsSearch: React.FC = () => {
  const location = useLocation();
  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductBySearchQuery(location.search);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <span>something went wrong</span>;
  }
  if (products?.length === 0) {
    return <NotFound />;
  }

  return (
    <Layout>
      <div className="grid-cols-4 mt-3 max-w-6xl mx-auto mb-2 h-screen">
        <h3 className="text-xl my-3 uppercase font-bold">result</h3>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-4 sm:grid-cols-2 ">
          {products?.map((item: Product) => (
            <CardItem item={item} key={item._id} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductsSearch;
