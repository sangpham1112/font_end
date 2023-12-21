type PropsInputElement = {
  Label: string;
  Type: string;
  PlaceHolder?: string;
  onUpdateFunc?: (key: string, value: any) => void;
  Key?: string;
  Value?: any;
};
const InputElement: React.FC<PropsInputElement> = ({
  Label,
  Type,
  PlaceHolder,
  onUpdateFunc,
  Key,
  Value,
}) => {
  return (
    <div className="my-3">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {Label}
      </label>
      <input
        type={Type}
        min={Type === "number" ? "0" : ""}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={PlaceHolder}
        value={Value}
        required
        onChange={(e) =>
          onUpdateFunc && Key !== undefined && onUpdateFunc(Key, e.target.value)
        }
      />
    </div>
  );
};

export default InputElement;
