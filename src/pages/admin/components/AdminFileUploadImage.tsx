import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../feature/hook";
import { getImage } from "../../../feature/slices/adminSlice";
import { VscLock } from "react-icons/vsc";

type AdminFileUploadImageType = {
  currentImage?: string;
  productName?: string;
};

const AdminFileUploadImage: React.FC<AdminFileUploadImageType> = ({
  currentImage,
  productName,
}) => {
  const [Image, setImage] = useState({ file: null, preview: "" });
  const [isClocked, setIsClocked] = useState(false);
  const dispatch = useAppDispatch();
  const preset_key = "zhb0jq4p";
  const cloud_name = "doz5mvuxw";

  const handleChange = (e: any) => {
    const file = e.target.files[0];
    const preview = URL.createObjectURL(file);
    setImage({ file, preview });
  };

  const clockImage = () => {
    if (Image.file) {
      const formData = new FormData();
      formData.append("file", Image.file);
      formData.append("upload_preset", preset_key);
      fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => dispatch(getImage(data.secure_url)))
        .catch((err) => console.log(err));

      setIsClocked(true);
    } else {
      console.log("No file selected");
    }
  };

  useEffect(() => {
    return () => {
      if (Image) {
        URL.revokeObjectURL(Image.preview);
      }
    };
  }, [Image]);

  return (
    <div className="mb-4">
      <span className="block mb-2 text-sm font-medium text-gray-900 ">
        Product Image
      </span>
      <div className="relative p-2 bg-gray-100 rounded-lg">
        {currentImage && Image.preview === "" && (
          <img
            src={currentImage}
            alt={productName ?? "image"}
            className="w-64 h-64"
          />
        )}
        {Image.preview !== "" && (
          <img
            src={Image.preview}
            alt={productName ?? "image"}
            className="w-64 h-64"
          />
        )}
        {Image.preview !== "" && isClocked === false && (
          <span
            onClick={() => clockImage()}
            className="text-4xl mt-3 font-bold text-blue-700 cursor-pointer absolute top-3 left-3">
            <VscLock />
          </span>
        )}
        {Image.preview !== "" && isClocked === true && (
          <span className="text-4xl mt-3 font-bold text-gray-700 absolute top-3 left-3">
            <VscLock />
          </span>
        )}
      </div>
      <div className="flex justify-start w-full">
        <input type="file" onChange={handleChange} />
      </div>
    </div>
  );
};

export default AdminFileUploadImage;
