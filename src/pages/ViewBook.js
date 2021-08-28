import { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";

import Button from "../components/Button";
import Loader from "../components/Loader";
// import Review from "../components/Review";

import { GET_ONE_BOOK } from "../utils/graphqlBook";
import { useBooksSlice } from "../redux/getState";

function ViewBook({ history }) {
  const [isFrontCover, setIsFrontCover] = useState(true);
  const [{ currentBook: book }, dispatchBook] = useBooksSlice();

  const { loading } = useQuery(GET_ONE_BOOK, {
    variables: { id: history.location.hash.replace("#", "") },
    skip: book !== null,
    onCompleted(data) {
      dispatchBook({
        type: "SET_CURRENT_BOOK",
        payload: data.getOneBook,
      });
    },
  });

  const [screen, setScreen] = useState(window.innerWidth);

  window.onresize = () => setScreen(window.innerWidth);

  const flipBookCover = () => {
    if (book.backCoverUrl) {
      setIsFrontCover(!isFrontCover);
    }
  };

  const handlePurchaseClick = () => history.push("/buy#" + book.id);

  useEffect(() => {
    if (book) {
      document.title = `PDF Store | ${book.title}`;
    }
  }, [book]);

  if (loading) return <Loader />;

  return (
    <div className="p-5 pt-0 mt-2 mx-auto sm:w-3/4">
      <h1 className="w-full mt-2 mb-3 text-gray-600 text-lg font-semibold font-oxygen sm:text-2xl">
        {book?.title || "Databases With SQL: An Introduction to MYSQL and PHP"}
      </h1>

      <div className="flex place-items-center w-fit m-auto gap-7">
        <img
          src={book?.frontCoverUrl}
          alt={
            book?.title ||
            "Databases With SQL: An Introduction to MYSQL and PHP"
          }
          loading="lazy"
          className={`mt-2 line-clamp-2 overflow-hidden w-4/5 xsm:w-2/5 ${
            screen < 550 && !isFrontCover && "hidden sr-only"
          }`}
        />
        <img
          src={book?.backCoverUrl}
          alt={
            book?.title ||
            "Databases With SQL: An Introduction to MYSQL and PHP"
          }
          className={`mt-2 line-clamp-2 overflow-hidden w-4/5 xsm:w-2/5 ${
            screen < 550 && isFrontCover && "hidden sr-only"
          } `}
        />
        <button
          onClick={flipBookCover}
          className="px-7 py-7 shadow-md bg-gray-600 outline-none text-white -ml-16 font-bold rounded-full hover:bg-gray-200 hover:text-blue-500 transition-all xsm:hidden"
        >
          Flip
        </button>
      </div>
      <section>
        <div className="my-2 mt-4 flex place-items-center">
          <span className="h-px flex-1 w-1/3 bg-gray-500"></span>
          <span
            className="text-center px-2 text-gray-400 font-poppins"
            style={{ fontStyle: "oblique" }}
          >
            Book Overview
          </span>
          <span className="h-px flex-1 w-1/3 bg-gray-500"></span>
        </div>
        <div>
          <h4 className="text-gray-400 font-oxygen underline">Description</h4>
          <p className="font-poppins whitespace-pre-line text-gray-700 text-sm">
            {book?.description ||
              `The Lean Startup is about learning what your customers really want —
            and learning it quickly. It’s about continuously testing what you
            think your customers might want and adapting based on the results —
            and doing this before you run out of money.`}
          </p>
        </div>

        <div className="flex flex-col mt-4 mb-2">
          <h4 className="text-gray-400 font-oxygen underline">Selling Price</h4>

          <span className="text-xl pl-3 text-red-500 font-extrabold font-poppins">
            {`R${book?.price}` || `R40, 00`}
          </span>
        </div>

        <div>
          <h4 className="text-gray-400 text-lg font-oxygen underline">
            Author
          </h4>
          <p className="font-poppins pl-3 text-gray-600 font-bold text-base">
            {book?.author || `Eric Ries`}
          </p>
        </div>

        {/* <div className="py-3 font-poppins">
          <details className="transition-all cursor-pointer">
            <summary className="underline mb-4 outline-none text-blue-500">
              Book Reviews
            </summary>

            <div className="flex flex-wrap gap-5 w-fit items-center content-center">
              <Review />
              <Review />
              <Review />
            </div>
          </details>
        </div> */}

        <Button name="Purchase" onClick={handlePurchaseClick} />
      </section>
    </div>
  );
}

export default ViewBook;
