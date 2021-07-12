import { useState } from "react";
import ReactCrop from "react-image-crop";
import { Button } from "@material-ui/core";

import { useUserSlice } from "../redux/getState";
import getCroppedImg from "../utils/getCroppedImage";

import "react-image-crop/dist/ReactCrop.css";

function CropImage() {
  const [{ cropImageInfo }, dispatch] = useUserSlice();
  const [cropInfo, setCropInfo] = useState({
    src: null,
    crop: {
      unit: "%",
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      aspect: 1,
    },
    croppedImageUrl: null,
  });

  let cropImage = cropImageInfo.loadedImgUrl
    ? document.querySelector(".ReactCrop__image")
    : null;

  const onCropChange = (crop, percentCrop) => {
    setCropInfo({ ...cropInfo, crop: percentCrop });
  };

  const onCropComplete = (crop) => {
    setCropInfo({ ...cropInfo, crop: crop });
  };

  const onImageLoaded = (image) => {
    // console.log(image);

    cropImage = image;

    let primarySide = image.height;
    if (image.naturalWidth < image.naturalHeight) {
      primarySide = image.width;
    }

    setCropInfo({
      ...cropInfo,
      crop: {
        ...cropInfo.crop,
        x: 0,
        y: 0,
        width: (primarySide / image.width) * 100,
        height: (primarySide / image.naturalHeight) * 100,
      },
    });
    console.log(cropImage);
    return false;
  };

  async function makeClientCrop(crop) {
    if (cropImage && crop.width && crop.height) {
      // console.log(cropImage);
      const croppedImageUrl = await getCroppedImg({
        image: cropImage,
        crop: crop,
        fileName: "newfile.webp",
      });

      dispatch({
        payload: {
          ...cropImageInfo,
          loadedImgUrl: null,
          croppedImgUrl: croppedImageUrl,
        },
      });

      //   let temp = { ...imgCrop };
      //   if (temp.square) {
      //     // dispatch({
      //     //   type: "SET_CROP_IMG",
      //     //   payload: {
      //     //     ...imgCrop,
      //     //     imgSrc: null,
      //     //     croppedProfileImgUrl: croppedImageUrl,
      //     //   },
      //     // });
      //   } else {
      //     dispatch({
      //       type: "SET_CROP_IMG",
      //       payload: {
      //         ...imgCrop,
      //         imgSrc: null,
      //         croppedBookImgUrl: croppedImageUrl,
      //       },
      //     });
      //   }

      //   temp = 0;
    }
  }

  const cancelCrop = () => {
    // dispatch({
    //   type: "SET_CROP_IMG",
    //   payload: { imgSrc: null, croppedImgUrl: null },
    // });
    dispatch({
      payload: { ...cropImageInfo, loadedImgUrl: null },
    });
  };

  return (
    <section className="w-screen h-screen flex flex-col absolute z-20 top-0 left-0">
      <ReactCrop
        src={cropImageInfo.loadedImgUrl}
        crop={cropInfo.crop}
        onImageLoaded={onImageLoaded}
        onChange={onCropChange}
        onComplete={onCropComplete}
      />

      <div className="w-full flex gap-3 justify-center my-2">
        <Button
          className="text-center capitalize font-bold shadow-md rounded-md bg-gray-800 text-white hover:bg-gray-300 hover:text-blue-500 transition-all"
          onClick={cancelCrop}
        >
          Cancel
        </Button>
        <Button
          onClick={() => makeClientCrop(cropInfo.crop)}
          className="text-center capitalize font-bold shadow-md rounded-md bg-gray-800 text-white hover:bg-gray-300 hover:text-blue-500 transition-all"
        >
          Done
        </Button>
      </div>
    </section>
  );
}

export default CropImage;
