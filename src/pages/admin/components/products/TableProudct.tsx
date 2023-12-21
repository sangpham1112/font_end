import { useNavigate } from "react-router-dom";
import Stars from "../../../../components/Stars";
import { useGetProductsQuery } from "../../../../feature/api/apiProductSlice";
import Loading from "../../../../components/Loading";
import { useAppDispatch } from "../../../../feature/hook";
import {
  OpenAddProudctModal,
  OpenDeleteProudctModal,
  getChosenProductId,
} from "../../../../feature/slices/adminSlice";
import { Product } from "../../../../types";
import { Pagination } from "flowbite-react";
import paginate from "../../../../utils/paginate";

const TableProudct: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: products, isLoading, isError } = useGetProductsQuery("");

  const { setCurrentPage, currentProductList, pageNumbers, currentPage } =
    paginate(products!);

  const openEditProduct = (item: Product) => {
    navigate(`/dashboard/edit/${item.slug}`);
  };
  const DeleteConfirm = (id: string) => {
    dispatch(getChosenProductId(id));
    dispatch(OpenDeleteProudctModal());
  };
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <span>something went wrong!</span>;
  }

  return (
    <section className="bg-gray-50 p-3 sm:p-5 h-full w-full">
      <div className="">
        <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div className="flex-1 flex items-center space-x-2">
              <h5>
                <span className="text-gray-500">All Products</span>
              </h5>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4 border-t">
            <div className="flex-1">
              <button
                type="button"
                id="createProductButton"
                onClick={() => dispatch(OpenAddProudctModal())}
                className="flex items-center justify-center text-white bg-blue-700 font-medium rounded-lg text-sm px-4 py-2">
                <svg
                  className="h-3.5 w-3.5 mr-1.5 -ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true">
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  />
                </svg>
                Add product
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4">
                    Product
                  </th>
                  <th scope="col" className="p-4">
                    Category
                  </th>
                  <th scope="col" className="p-4">
                    Brand
                  </th>
                  <th scope="col" className="p-4">
                    Stock
                  </th>
                  <th scope="col" className="p-4">
                    Rating
                  </th>
                  <th scope="col" className="p-4">
                    Last Update
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentProductList?.map((item) => {
                  return (
                    <tr
                      className="border-b dark:border-gray-600 hover:bg-gray-100"
                      key={item._id}>
                      <th
                        scope="row"
                        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="flex items-center mr-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className=" h-14 w-16 rounded-md mr-3"
                          />
                          {item.name}
                        </div>
                      </th>
                      <td className="px-4 py-3">
                        <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                          {item.brand}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="flex items-center">
                          {item.countInStock}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="flex items-center">
                          <Stars starNum={item.rating} />
                          <span className="text-gray-500 dark:text-gray-400 ml-1">
                            {item.rating.toFixed(2)}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="flex items-center space-x-4">
                          <button
                            type="button"
                            onClick={() => openEditProduct(item)}
                            className="py-2 px-3 flex items-center text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:outline-none focus:ring-primary-300 bg-primary-600 bg-blue-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-2 -ml-0.5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true">
                              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                              <path
                                fillRule="evenodd"
                                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => DeleteConfirm(item._id)}
                            className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-2 -ml-0.5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true">
                              <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {pageNumbers > 1 && (
            <Pagination
              onPageChange={setCurrentPage}
              currentPage={currentPage}
              totalPages={pageNumbers}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default TableProudct;
