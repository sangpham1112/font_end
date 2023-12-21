import { useAppDispatch, useAppSelector } from "../../../../feature/hook";
import { ClosePreviewModal } from "../../../../feature/slices/adminSlice";
import { FormatePrice } from "../../../../utils/FormatPrice";

const ReviewOrderItemsModal: React.FC = () => {
  const { previewModalOpen, currentPreview } = useAppSelector(
    (state) => state.admin
  );
  const dispatch = useAppDispatch();
  const cssToggleModal = previewModalOpen === true ? "flex " : "hidden ";

  if (!currentPreview) {
    return null;
  }
  return (
    <>
      <div
        className={
          cssToggleModal +
          "overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"
        }
      >
        <div className="relative p-4 w-full max-w-2xl max-h-96">
          {/* Modal content */}
          <div className="relative p-4 bg-white rounded-lg shadow sm:p-5">
            {/* Modal header */}
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Items
              </h3>
              <button
                type="button"
                onClick={() => dispatch(ClosePreviewModal())}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
            <ol className="space-y-4 text-gray-700 list-decimal list-inside max-h-fit">
              {currentPreview?.map((item) => {
                return (
                  <li key={item._id}>
                    <span className="font-semibold">{item.name}</span>
                    <ul className="pl-5 mt-2 space-y-1 list-disc list-inside">
                      <li>
                        {" "}
                        <span className="font-semibold">Price: </span>
                        {FormatePrice(item.price)}
                      </li>
                      <li>
                        <span className="font-semibold">Quantity:</span>{" "}
                        {item.quantity}
                      </li>
                      <li>
                        <span className="font-semibold">
                          Total Price (included ship):
                        </span>{" "}
                        {item.quantity &&
                          FormatePrice(
                            item.quantity * item.price + item.shippingPrice
                          )}
                      </li>
                    </ul>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewOrderItemsModal;
