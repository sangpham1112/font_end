import { Pagination } from "flowbite-react";
import Loading from "../components/Loading";
import { useGetProductsQuery } from "../feature/api/apiProductSlice";
import { useLocation } from "react-router-dom";
import paginate from "../utils/paginate";
import { lazy, Suspense } from "react";

const ProductList = lazy(() => import("../components/ProductList"));
const SideBar = lazy(() => import("../components/Sidebar"));
const Layout = lazy(() => import("../components/Layout"));

export const Home: React.FC = () => {
  const location = useLocation();
  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsQuery(location.search);
  const { pageNumbers, setCurrentPage, currentProductList, currentPage } =
    paginate(products!);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <span>something went wrong</span>;
  }

  return (
    <Suspense>
      <Layout>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-3 max-w-6xl mx-auto mb-2 gap-2">
          <div className="col-span-1">
            <SideBar />
          </div>
          <div className="col-span-2 lg:col-span-3">
            {products && (
              <ProductList currentProductList={currentProductList} />
            )}
            {pageNumbers > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={pageNumbers}
                className="mt-2"
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </div>
      </Layout>
    </Suspense>
  );
};
