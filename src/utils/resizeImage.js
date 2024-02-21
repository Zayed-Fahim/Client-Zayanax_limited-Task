import Resizer from "react-image-file-resizer";

const resizeFile = (file) => {
  return new Promise((resolve) => {
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
      "base64",
      500,
      500
    );
  });
};

export default resizeFile;
