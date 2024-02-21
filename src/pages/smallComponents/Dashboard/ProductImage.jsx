import React, { useRef } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import Button from "../../reuseableComponents/Button";
import resizeFile from "../../../utils/resizeImage";

const ProductImage = ({ setProcessedImage, processedImage, setImageError }) => {
  const fileInputRef = useRef(null);

  const removeButtonClassNames =
    "bg-white px-3 py-1 shadow rounded absolute bottom-2 right-2";

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    try {
      const image = await resizeFile(file);
      setProcessedImage(image);
    } catch (err) {
      setImageError(err.message);
    }
  };

  const handleFileButtonClick = (event) => {
    event.preventDefault();
    fileInputRef.current.click();
  };
  return (
    <>
      {processedImage ? (
        <div className="h-[200px] w-full bg-black bg-opacity-20 rounded relative">
          <img
            className="h-[200px] w-full object-contain flex justify-center items-center"
            src={processedImage}
            alt=""
          />
          <Button
            text={
              <div className="flex items-center justify-center gap-2">
                <span>Remove</span>
                <RiDeleteBinLine className="w-5 h-5" />
              </div>
            }
            classNames={removeButtonClassNames}
            type="button"
            onClick={() => setProcessedImage(null)}
          />
        </div>
      ) : (
        <div className="h-[170px] w-full bg-[#FFF700] rounded cursor-pointer">
          <input
            type="file"
            className="hidden"
            name="file"
            id="file"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <label
            htmlFor="file"
            className="flex flex-col justify-center items-center gap-1 h-full w-full"
            onClick={handleFileButtonClick}
          >
            <span className="text-center font-semibold cursor-pointer">
              Upload <br /> Product Image
            </span>
            <span className="text-sm font-medium">Image Size Must be</span>
            <span className="text-[12px] font-semibold">500x500</span>
          </label>
        </div>
      )}
    </>
  );
};

export default ProductImage;
