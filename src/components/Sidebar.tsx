import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../feature/hook";
import { resetURL } from "../feature/slices/filterSlice";
import { useState } from "react";
import { CategoryFilter } from "./CategoryFilter";
import { PricesFilter } from "./PricesFilter";
import { RatingFilter } from "./RatingFilter";
import { useGetCategoryFromProductsQuery } from "../feature/api/apiProductSlice";
import Loading from "./Loading";

const SideBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    data: categories,
    isLoading,
    isError,
  } = useGetCategoryFromProductsQuery();
  const { category, rating, priceMax, priceMin } = useAppSelector(
    (state) => state.filter
  );
  const [checkedState, setCheckedState] = useState(
    new Array(categories?.length).fill(false)
  );
  const [checkedRadioState, setCheckedRadioState] = useState([
    false,
    false,
    false,
    false,
  ]);

  const handleApply = () => {
    const formatCate = category.join("-");
    const url = `/?priceMax=${priceMax}&priceMin=${priceMin}&rating=${rating}&category=${formatCate}`;
    navigate(url);
  };
  const handleClear = () => {
    dispatch(resetURL());
    setCheckedState(new Array(categories?.length).fill(false));
    setCheckedRadioState([false, false, false, false]);
    navigate("/");
  };

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <span>something went wrong!!</span>;
  }
  return (
    <div className="border border-gray-300 w-full h-full bg-white p-2 rounded-md space-y-2 devide">
      <h5 className="inline-flex items-center text-base font-semibold text-gray-500 uppercase dark:text-gray-400">
        Apply filters
      </h5>
      <div className="flex justify-center w-full py-2 mt-7 space-x-2 ">
        <button
          onClick={() => handleApply()}
          type="submit"
          className="w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Apply
        </button>
        <button
          onClick={() => handleClear()}
          type="reset"
          className="w-full px-5 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Clear all
        </button>
      </div>

      {categories && (
        <CategoryFilter
          checkedState={checkedState}
          setCheckedState={setCheckedState}
          categories={categories}
        />
      )}
      <PricesFilter />
      <RatingFilter
        checkedRadioState={checkedRadioState}
        setCheckedRadioState={setCheckedRadioState}
      />
    </div>
  );
};

export default SideBar;
