import { useAppSelector } from "../feature/hook";

const Stepper: React.FC = () => {
  const { stepDone } = useAppSelector((state) => state.currentOrder);
  const cssClasses = {
    activeText: "text-blue-600 dark:text-blue-500",
    activeNumber: "border-blue-500",
    inActiveText: "text-gray-600 dark:text-gray-500",
    inActiveNumber: "border-gray-600 dark:border-gray-500",
  };

  const ProgressStep = [
    {
      Label: "Sign In",
      step: 1,
      isActive: true,
    },
    {
      Label: "Shipping Address",
      step: 2,
      isActive: stepDone === 2 || stepDone === 3,
    },
    {
      Label: "Place Order",
      step: 3,
      isActive: stepDone === 3,
    },
  ];
  // console.log(stepDone);
  return (
    <ol className="flex justify-between items-center w-full space-y-4 sm:space-y-0 border border-gray-200 p-4 rounded-md">
      {ProgressStep.map((item) => {
        return (
          <li
            className={
              item.isActive === true
                ? "flex items-center space-x-2.5 " + cssClasses.activeText
                : "flex items-center space-x-2.5 " + cssClasses.inActiveText
            }
            key={item.step}
          >
            <span
              className={
                item.isActive === true
                  ? "flex items-center justify-center w-8 h-8 border rounded-full shrink-0 " +
                    cssClasses.activeNumber
                  : "flex items-center justify-center w-8 h-8 border rounded-full shrink-0 " +
                    cssClasses.inActiveNumber
              }
            >
              {item.step}
            </span>
            <span>
              <h3 className="font-medium leading-tight">{item.Label}</h3>
            </span>
          </li>
        );
      })}
    </ol>
  );
};

export default Stepper;
