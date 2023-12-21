import { useAppDispatch, useAppSelector } from "../feature/hook";
import { getPriceMax, getPriceMin } from "../feature/slices/filterSlice";

export const PricesFilter = () => {
  const dispatch = useAppDispatch();
  const { priceMax, priceMin } = useAppSelector((state) => state.filter);
  return (
    <>
      {/* Prices */}
      <div className="space-y-2">
        <h6 className="text-base font-medium text-black underline">Prices</h6>
        <div className="flex items-center justify-between col-span-2 space-x-3">
          <div className="w-full">
            <label
              htmlFor="min-experience-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              From
            </label>
            <input
              type="number"
              value={priceMin}
              min={1}
              max={10000}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder=""
              onChange={(e) => dispatch(getPriceMin(e.target.value))}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="price-to"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              To
            </label>
            <input
              type="number"
              // defaultValue={3500}
              min={1}
              max={10000}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              value={priceMax}
              onChange={(e) => dispatch(getPriceMax(e.target.value))}
            />
          </div>
        </div>
      </div>
    </>
  );
};
