import React, { useRef, useState } from "react";
import Resizer from "react-image-file-resizer";
import Button from "../../reuseableComponents/Button";
import { RiDeleteBinLine } from "react-icons/ri";

const ProductImage = () => {
  const fileInputRef = useRef(null);
  const [processedImage, setProcessedImage] = useState(null);
  const removeButtonClassNames =
    "bg-white px-3 py-1 shadow rounded absolute bottom-2 right-2";

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        500,
        500,
        "PNG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });
  const handleFileChange = async (event) => {
    try {
      const file = event.target.files[0];
      const image = await resizeFile(file);
      setProcessedImage(image);
    } catch (err) {
      console.log(err);
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
