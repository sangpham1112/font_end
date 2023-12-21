import InputElement from "../../../../components/InputElement";
import { useCreateProductMutation } from "../../../../feature/api/apiProductSlice";
import { useAppDispatch, useAppSelector } from "../../../../feature/hook";
import {
  CloseAddProudctModal,
  getImage,
} from "../../../../feature/slices/adminSlice";
import { useUpdateFormHook } from "../../../../utils/useUpdateFormHook";
import AdminFileUploadImage from "../AdminFileUploadImage";

const CreateProductModal: React.FC = () => {
  const { addProductModalOpen, image } = useAppSelector((state) => state.admin);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const initialCreateProductState = {
    name: "",
    category: "",
    brand: "",
    slug: "",
    price: 0,
    previousPrice: 0,
    shippingPrice: 0,
    description: "",
    countInStock: 0,
  };
  const { formValues, setFirstValue, onUpdate } = useUpdateFormHook(
    initialCreateProductState
  );
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const handleCreateProduct = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const token = user?.token;
    if (!image) {
      alert("thieu image");
      return;
    }
    createProduct({ ...formValues, token, image });
    setFirstValue();
    dispatch(CloseAddProudctModal());
    dispatch(getImage({}));
  };

  const cssModal = addProductModalOpen === true ? "" : "hidden";
  //bỏ hidden di
  return (
    <div
      className={
        cssModal +
        " overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] md:h-full bg-[rgba(0,0,0,0.5)]"
      }>
      <div className="relative p-4 mx-auto max-w-3xl h-full md:h-auto">
        {/* Modal content */}
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          {/* Modal header */}
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5">
            <h3 className="text-lg font-semibold text-gray-900">Add Product</h3>
            <button
              type="button"
              onClick={() => dispatch(CloseAddProudctModal())}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* Modal body */}
          <form onSubmit={handleCreateProduct}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2 items-center">
              <div>
                <InputElement
                  Label="Product Name"
                  Type="text"
                  Key="name"
                  onUpdateFunc={onUpdate}
                  Value={formValues.name}
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900">
                  Category
                </label>
                <select
                  onChange={(e) => onUpdate("category", e.target.value)}
                  value={formValues.category}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                  <option>Select category</option>
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
                  Label="Brand"
                  Type="text"
                  Value={formValues.brand}
                  onUpdateFunc={onUpdate}
                  Key="brand"
                />
              </div>
              <div>
                <InputElement
                  Label="Slug"
                  Type="text"
                  Value={formValues.slug}
                  onUpdateFunc={onUpdate}
                  Key="slug"
                />
              </div>
              <div className="grid gap-4 sm:col-span-2 md:gap-6 sm:grid-cols-4">
                <div>
                  <InputElement
                    Label="Price"
                    Type="number"
                    Value={formValues.price}
                    onUpdateFunc={onUpdate}
                    Key="price"
                  />
                </div>
                <div>
                  <InputElement
                    Label="Previous Price"
                    Type="number"
                    Value={formValues.previousPrice}
                    onUpdateFunc={onUpdate}
                    Key="previousPrice"
                  />
                </div>
                <div>
                  <InputElement
                    Label="Shipping Price"
                    Type="number"
                    Value={formValues.shippingPrice}
                    onUpdateFunc={onUpdate}
                    Key="shippingPrice"
                  />
                </div>
                <div>
                  <InputElement
                    Label="Stock"
                    Type="number"
                    Value={formValues.countInStock}
                    onUpdateFunc={onUpdate}
                    Key="countInStock"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 ">
                  Description
                </label>
                <textarea
                  id="description"
                  value={formValues.description}
                  onChange={(e) => onUpdate("description", e.target.value)}
                  rows={4}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Write product description here"
                />
              </div>
            </div>
            <AdminFileUploadImage />
            <div className="items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto justify-center text-white inline-flex bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Add product
              </button>
              <button
                onClick={() => dispatch(CloseAddProudctModal())}
                type="button"
                className="w-full justify-center sm:w-auto text-gray-500 inline-flex items-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">
                <svg
                  className="mr-1 -ml-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Discard
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProductModal;
