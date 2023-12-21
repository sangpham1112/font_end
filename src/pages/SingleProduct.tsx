import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../feature/api/apiProductSlice";
import { lazy, Suspense } from "react";

const Layout = lazy(() => import("../components/Layout"));
const ProductInfor = lazy(() => import("../components/ProductInfor"));
const Comment = lazy(() => import("../components/Comment"));
const Loading = lazy(() => import("../components/Loading"));
const CreateComment = lazy(() => import("../components/CreateComment"));

const SingleProduct: React.FC = () => {
  const { slug } = useParams();
  const { data: product, isError, isLoading } = useGetProductQuery(slug!);

  let content;
  if (isLoading) {
    content = <Loading />;
  }
  if (isError) {
    content = <span>some thing went wrong</span>;
  }
  if (product) {
    content = (
      <div className="mx-auto max-w-4xl my-3">
        <ProductInfor product={product} />
        <Comment slug={slug} />
        <CreateComment slug={slug} />
      </div>
    );
  }

  return (
    <Suspense>
      <Layout>{content}</Layout>
    </Suspense>
  );
};

export default SingleProduct;
