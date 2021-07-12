import { useRef } from "react";
import AddAPhotoOutlinedIcon from "@material-ui/icons/AddAPhotoOutlined";

import defaultImg from "../account-home.png";
import { useUserSlice } from "../redux/getState";

function ImagePicker({ title, alt }) {
  const [{ cropImageInfo }, dispatch] = useUserSlice();
  const fileInputRef = useRef(null);

  const handleFileInput = (e) => {
    const [file] = e.target.files;

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) =>
        dispatch({
          payload: { ...cropImageInfo, loadedImgUrl: e.target.result },
        });

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="imagePicker">
      <h1>{title}</h1>
      <input
        type="file"
        multiple={false}
        ref={fileInputRef}
        onChange={handleFileInput}
        accept="image/*"
        style={{ display: "none" }}
      />

      <div
        className="w-7/12 aspect bg-gray-800 group relative grid place-items-center shadow-lg rounded-full overflow-hidden cursor-pointer m-auto"
        onClick={() => fileInputRef.current.click()}
      >
        <span className="p-4 rounded-full text-white transition-all opacity-40 group-hover:opacity-80 group-hover:shadow-md bg-gray-800 absolute self-center z-10">
          <AddAPhotoOutlinedIcon />
        </span>
        <img
          className="w-full object-contain"
          src={cropImageInfo?.croppedImgUrl || defaultImg}
          alt={alt}
        />
      </div>
    </div>
  );
}

export default ImagePicker;
