import { useAppDispatch } from "../feature/hook";
import { getCategory } from "../feature/slices/filterSlice";

type CategoryFilterType = {
  checkedState: any;
  setCheckedState: React.Dispatch<React.SetStateAction<any[]>>;
  categories: string[];
};

export const CategoryFilter: React.FC<CategoryFilterType> = ({
  checkedState,
  setCheckedState,
  categories,
}) => {
  const dispatch = useAppDispatch();

  const handleChange = (position: number) => {
    const updatedCheckedState = checkedState.map((item: any, index: number) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
    const ChosenCate = updatedCheckedState
      .map((currentState: any, index: number) => {
        if (currentState === true) {
          return categories[index];
        }
      })
      .filter(Boolean);
    dispatch(getCategory(ChosenCate));
  };

  return (
    <div className="flex flex-col justify-between flex-1">
      <div className="space-y-6">
        {/* Categories */}
        <div className="space-y-2">
          <h6 className="text-base font-medium text-black underline">
            Categories
          </h6>

          {categories?.map((cate, index) => {
            return (
              <div className="flex items-center" key={cate}>
                <input
                  type="checkbox"
                  onChange={() => handleChange(index)}
                  value={cate}
                  checked={checkedState[index]}
                  className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  {cate}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
