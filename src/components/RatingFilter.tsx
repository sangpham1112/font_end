import { FaArrowAltCircleUp } from "react-icons/fa";
import { useAppDispatch } from "../feature/hook";
import Stars from "./Stars";
import { getRating } from "../feature/slices/filterSlice";

type RatingFilterPropsType = {
  checkedRadioState: any;
  setCheckedRadioState: React.Dispatch<React.SetStateAction<boolean[]>>;
};
export const RatingFilter: React.FC<RatingFilterPropsType> = ({
  checkedRadioState,
  setCheckedRadioState,
}) => {
  const stars = [1, 2, 3, 4];
  const dispatch = useAppDispatch();

  const onChangeRadioButton = (value: any, position: number) => {
    const currentRadioState = checkedRadioState.map(
      (item: boolean, index: number) => {
        position === index ? true : item;
      }
    );
    setCheckedRadioState(currentRadioState);
    dispatch(getRating(value));
  };

  return (
    <>
      {/* Rating */}
      <div className="space-y-2">
        <h6 className="text-base font-medium text-black underline">Rating</h6>
        {stars.map((star, index) => {
          return (
            <div className="flex items-center" key={star}>
              <input
                type="radio"
                name="rating"
                className="w-4 h-4 bg-gray-100 border-gray-300 text-primary-600 focus:ring-primary-500  focus:ring-2 "
                value={star}
                checked={checkedRadioState[index]}
                onChange={(e) => onChangeRadioButton(e.target.value, index)}
              />
              <label className="flex items-center ml-2">
                <span className="text-blue-400">
                  <FaArrowAltCircleUp />
                </span>
                <Stars starNum={star} />{" "}
              </label>
            </div>
          );
        })}
      </div>
    </>
  );
};
