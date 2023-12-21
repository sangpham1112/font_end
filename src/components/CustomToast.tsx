import { Toast } from "flowbite-react";
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineWarning,
} from "react-icons/ai";

type Toast = {
  text: string;
  status: "success" | "warning" | "error";
};

const CustomToast: React.FC<Toast> = ({ text, status }) => {
  let cssStatus, IconStatus;
  switch (status) {
    case "error":
      cssStatus = "bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200";
      IconStatus = <AiOutlineCloseCircle />;
      break;
    case "success":
      cssStatus =
        "bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200";
      IconStatus = <AiOutlineCheckCircle />;
      break;
    case "warning":
      cssStatus =
        "bg-orange-100 text-orange-500 dark:bg-orange-800 dark:text-orange-200";
      IconStatus = <AiOutlineWarning />;
      break;
  }

  return (
    <Toast>
      <div
        className={
          "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" +
          cssStatus
        }
      >
        <span className="h-5 w-5">{IconStatus}</span>
      </div>
      <div className="ml-3 text-sm font-normal">{text}</div>
      <Toast.Toggle />
    </Toast>
  );
};

export default CustomToast;
