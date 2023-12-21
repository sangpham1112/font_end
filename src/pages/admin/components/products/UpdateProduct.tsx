import { useParams } from "react-router-dom";
import InputElement from "../../../../components/InputElement";
import {
  useGetProductQuery,
  useUpdateProductMutation,
} from "../../../../feature/api/apiProductSlice";
import Loading from "../../../../components/Loading";
import { useUpdateFormHook } from "../../../../utils/useUpdateFormHook";
import { useEffect } from "react";
import { useAppSelector } from "../../../../feature/hook";
import AdminFileUploadImage from "../AdminFileUploadImage";
import { Link } from "react-router-dom";

const UpdateProduct: React.FC = () => {
  // open left-0 -> left-full
  const { slug } = useParams();
  const { user } = useAppSelector((state) => state.user);
  const { data: product, isLoading, isError } = useGetProductQuery(slug!);
  const { image } = useAppSelector((state) => state.admin);
  const { formValues, onUpdate, setFormValues } = useUpdateFormHook(product!);

  const [updateProduct, { isLoading: submitLoading }] =
    useUpdateProductMutation();

  const handleUpdateProduct = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const token = user?.token;
    // console.log({ ...formValues, image, token });
    updateProduct({ ...formValues, image, token });
  };
  //khi product thay đổi từ null sang data thì gán lại vào formValues
  useEffect(() => {
    setFormValues(product!);
  }, [product]);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <span>something went wrong</span>;
  }
  //check khi biến chưa được gán sẽ trả về null
  if (!formValues) {
    return null;
  }

  return (
    <form
      className={"w-full h-full p-4 bg-white"}
      onSubmit={handleUpdateProduct}
    >
      <h5 className="inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400">
        Edit Product
      </h5>
      <div className="grid gap-4 sm:grid-cols-3 sm:gap-6 ">
        <div className="space-y-4 sm:col-span-2 sm:space-y-6">
          <div>
            <InputElement
              Label="Name"
              Type="text"
              Value={formValues?.name}
              onUpdateFunc={onUpdate}
              Key="name"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Description
            </label>
            <textarea
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Describe Product"
              value={formValues?.description}
              onChange={(e) => onUpdate("description", e.target.value)}
            ></textarea>
          </div>
          <AdminFileUploadImage
            currentImage={formValues?.image}
            productName={formValues?.name}
          />
        </div>
        <div className="space-y-4 sm:space-y-6">
          <div>
            <InputElement
              Label="Brand"
              Type="text"
              Value={formValues?.brand}
              Key="brand"
              onUpdateFunc={onUpdate}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Category
            </label>
            <select
              onChange={(e) => onUpdate("category", e.target.value)}
              value={formValues.category}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
            >
              <option value="TV">TV/Monitors</option>
              <option value="PC">PC</option>
              <option value="Gaming">Gaming/Console</option>
              <option value="Phone">Phones</option>
              <option value="Food">Food</option>
              <option value="Car">Car</option>
              <option value="Pants">Pants</option>
              <option value="Shirts">Shirts</option>
              <option value="Shoes">Shoes</option>
            </select>
          </div>
          <div>
            <InputElement
              Label="Price"
              Type="number"
              Value={formValues?.price}
              Key="price"
              onUpdateFunc={onUpdate}
            />
          </div>
          <div>
            <InputElement
              Label="Previous Price"
              Type="number"
              Value={formValues?.previousPrice}
              Key="previousPrice"
              onUpdateFunc={onUpdate}
            />
          </div>
          <div>
            <InputElement
              Label="Shipping Price"
              Type="number"
              Value={formValues?.shippingPrice}
              Key="shippingPrice"
              onUpdateFunc={onUpdate}
            />
          </div>
          <div>
            <InputElement
              Label="Slug"
              Type="text"
              Value={formValues?.slug}
              Key="slug"
              onUpdateFunc={onUpdate}
            />
          </div>
          <div>
            <InputElement
              Label="Stock"
              Type="number"
              Value={formValues?.countInStock}
              Key="countInStock"
              onUpdateFunc={onUpdate}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-6 sm:w-1/2">
        <button
          type="submit"
          disabled={submitLoading}
          className="text-white bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Update product
        </button>
        <Link
          to={"/dashboard/products"}
          className="text-white bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Back
        </Link>
      </div>
    </form>
  );
};

export default UpdateProduct;
