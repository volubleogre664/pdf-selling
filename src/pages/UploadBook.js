import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Compressor from "compressorjs";
import firebase from "firebase";
import { useMutation } from "@apollo/react-hooks";

import { useForm } from "../utils/hooks";
import { useBooksSlice, useUserSlice } from "../redux/getState";
import { UPLOAD_BOOK } from "../utils/graphqlBook";

import Input from "../components/Input";
import TextArea from "../components/TextArea";
import Button from "../components/Button";
import Loader from "../components/Loader";

const book = {};

function UploadBook({ history }) {
  const frontCoverInputRef = useRef(null);
  const backCoverInputRef = useRef(null);
  const bookCopyInputRef = useRef(null);
  const [, dispatch] = useBooksSlice();
  const [{ data: userInfo }] = useUserSlice();
  const [loading, setLoading] = useState(false);

  const { onChange, values, onSubmit } = useForm(helpCallBack, {
    title: "",
    author: "",
    price: "",
    description: "",
    bookOwner: userInfo.email,
    pdfUrl: "",
    frontCoverUrl: "",
    backCoverUrl: "",
  });

  const [uploadBook] = useMutation(UPLOAD_BOOK, {
    variables: {
      ...values,
      frontCoverUrl: book.frontCoverUrl,
      backCoverUrl: book.backCoverUrl,
      pdfUrl: book.pdfUrl,
    },
    update(_, { data: { uploadBook: book } }) {
      setLoading(false);
      dispatch({
        payload: book,
      });

      history.push("/viewBook#" + book.id);
    },
    onError(err) {
      console.log(err?.graphQLErrors[0]?.extensions);
    },
  });

  useEffect(() => {
    document.title = "PDF Store | Upload Book";
  });

  async function uploadBookClick(e) {
    e.preventDefault();
    setLoading(true);

    const storageRef = firebase.storage().ref();
    const frontCoverRef = storageRef.child(
      `${userInfo.id}/book/frontCover.jpg`
    );
    const backCoverRef = storageRef.child(`${userInfo.id}/book/backCover.jpg`);
    const bookPdfRef = storageRef.child(
      `${userInfo.id}/book/${values.title.replace(/ /gi, "_")}.pdf`
    );

    compressAndUpload(frontCoverInputRef.current.files[0], frontCoverRef);
    compressAndUpload(backCoverInputRef.current.files[0], backCoverRef);

    await bookPdfRef
      .put(bookCopyInputRef.current.files[0])
      .then(() => {
        console.log("File uploaded");
      })
      .catch((err) => {
        console.log("Failed to upload Image to cloud", err);
      });

    await getUploadedUrl(`${userInfo.id}/book/frontCover.jpg`, "frontCoverUrl");
    await getUploadedUrl(`${userInfo.id}/book/backCover.jpg`, "backCoverUrl");
    await getUploadedUrl(
      `${userInfo.id}/book/${values.title.replace(/ /gi, "_")}.pdf`,
      "pdfUrl"
    );

    onSubmit(e);
  }

  function helpCallBack() {
    uploadBook();
  }

  async function getUploadedUrl(child, urlContainer) {
    await firebase
      .storage()
      .ref()
      .child(child)
      .getDownloadURL()
      .then((url) => {
        book[urlContainer] = url;
      })
      .catch((err) => console.log(err));
  }

  function compressAndUpload(file, cloudStorageRef) {
    new Compressor(file, {
      quality: 0.2,
      async success(result) {
        await cloudStorageRef
          .put(result)
          .then(() => {
            console.log("File uploaded");
          })
          .catch((err) => {
            console.log("Failed to upload Image to cloud", err);
          });
      },
      error(err) {
        console.log(err.message);
      },
    });
  }

  return (
    <div className="p-5 w-full max-w-md mx-auto">
      <h1 className="text-xl font-poppins font-semibold mb-2">
        Upload new book
      </h1>

      <form onSubmit={uploadBookClick} className="flex relative flex-col gap-4">
        {loading && <Loader />}
        <Input
          placeholder="Book title"
          name="title"
          type="text"
          id="bookTitle"
          onChange={onChange}
          value={values.title}
          capitalise={false}
          required={true}
        />

        <Input
          placeholder="Author(s)"
          name="author"
          type="text"
          id="bookAuthor"
          onChange={onChange}
          value={values.author}
          capitalise={true}
          required={true}
        />

        <Input
          placeholder="Selling price (R)"
          name="price"
          type="text"
          id="bookPrice"
          onChange={onChange}
          value={values.price}
          capitalise={false}
          required={true}
        />

        <div
          onClick={() => bookCopyInputRef.current.click()}
          className="flex gap-3 cursor-pointer justify-evenly relative font-poppins items-center p-3 pt-8 border border-solid border-gray-400 rounded-md"
        >
          <div className="px-3 py-0.5 w-full absolute top-0 left-0 z-10 text-xs text-gray-50 bg-gray-600 items-center rounded-t-md font-poppins">
            Click to add book (pdf, docx, epub)
          </div>

          <input
            type="file"
            name="bookCopy"
            ref={bookCopyInputRef}
            id="bookCopy"
            className="hidden"
            accept=".pdf"
            onChange={onChange}
            required={true}
            multiple={false}
          />
          <label className="py-4 line-clamp select-none text-sm text-gray-400 cursor-pointer">
            {values.bookCopy || "Click or drag 'n' drop"}
          </label>
        </div>

        <TextArea
          name="description"
          id="bookDescription"
          value={values.description}
          onChange={onChange}
          placeholder="Book Description"
          required={true}
          onKeyDown={(e) => e.key === "enter" && values.description + "\n"}
        />

        <div className="flex gap-2 justify-evenly relative font-poppins items-center p-3 pt-8 border border-solid border-gray-400 rounded-md">
          <div className="px-3 py-0.5 w-full absolute top-0 left-0 z-10 text-xs text-gray-50 bg-gray-600 items-center rounded-t-md font-poppins">
            Book covers (Click to add)
          </div>

          <div
            onClick={() => frontCoverInputRef.current.click()}
            className="shadow-md text-sm grid place-items-center cursor-pointer w-2/5 aspect rounded-md"
          >
            <input
              type="file"
              name="frontCover"
              id="frontCover"
              required
              multiple={false}
              accept="image/*"
              className="hidden"
              ref={frontCoverInputRef}
              onChange={onChange}
            />
            <img src={values.frontCover} alt="" />
            <span className="flex flex-col justify-center items-center">
              {/* <CheckIcon className="text-lg text-green-500" /> */}
              <label className="cursor-pointer">Front</label>
            </span>
          </div>

          <span className="w-px bg-gray-800 h-20"></span>

          <div
            className="shadow-md text-sm grid place-items-center cursor-pointer w-2/5 aspect rounded-md"
            onClick={() => backCoverInputRef.current.click()}
          >
            <input
              className="hidden"
              type="file"
              name="backCover"
              required
              id="backCover"
              multiple={false}
              accept="image/*"
              ref={backCoverInputRef}
              onChange={onChange}
            />
            <img src={values.backCover} alt="" />
            <label className="cursor-pointer">Back</label>
          </div>
        </div>

        <div className="flex flex-col mt-3">
          <Button name="Upload book" type="submit" />
          <Link
            className="block mt-3 text-center py-3 rounded-md font-semibold text-sm text-gray-800 border-2 border-solid border-gray-200 hover:text-black hover:border-gray-800"
            to="/viewbook#609532a895d992001557c364"
          >
            View Sample Book
          </Link>
        </div>
      </form>
    </div>
  );
}

export default UploadBook;
