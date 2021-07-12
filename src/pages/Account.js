import { useState } from "react";
import { useQuery } from "@apollo/react-hooks";

import { useBooksSlice, useUserSlice } from "../redux/getState";
import { GET_ALL_BOOKS } from "../utils/graphqlBook";

import Book from "../components/Book";
import Button from "../components/Button";
import Loader from "../components/Loader";
import { useEffect } from "react";
import EditUser from "./EditUser";

function Account({ history }) {
  const [{ data: userInfo }] = useUserSlice();
  const [editData, setEditData] = useState(false);
  const [{ books }, dispatchBook] = useBooksSlice();

  if (!userInfo) {
    history.push("/login");
  }

  const { loading } = useQuery(GET_ALL_BOOKS, {
    variables: { bookOwner: userInfo?.email },
    skip: userInfo === null,
    onCompleted(data) {
      dispatchBook({
        type: "SET_BOOKS",
        payload: data.getAllBooks,
      });
    },
  });

  const updateInfoClicked = () => setEditData(true);

  useEffect(() => {
    if (userInfo) {
      document.title = `PDF Store | ${userInfo?.firstName} ${userInfo?.lastName}`;
    }
  }, [userInfo]);

  if (loading && !books) return <Loader />;

  if (editData) return <EditUser editData={setEditData} user={userInfo} />;

  return (
    <section className="flex-1 flex flex-col px-5 py-6 font-oxygen relative mx-auto xsm:w-11/12 md:flex-row md:gap-5 md:justify-center md:mx-0 lg:gap-10">
      <aside className="w-full max-w-sm mx-auto md:float-left">
        <h4 className="text-gray-800 font-semibold">Personal Information</h4>
        <hr className="w-full mt-1 mb-2 h-0.5 bg-gray-400" />

        <div className="shadow-md py-3 px-4 bg-gray-50 relative mx-auto mt-5 space-y-3 font-light font-poppins text-gray-700">
          <div>
            <h4 className="border-b border-solid border-gray-400 mb-2 font-semibold">
              Name(s)
            </h4>
            <p className="ml-1.5 text-sm">
              {(userInfo && `${userInfo.firstName} ${userInfo.lastName}`) ||
                "John Doe"}
            </p>
          </div>

          <div>
            <h4 className="border-b border-solid border-gray-400 mb-2 font-semibold">
              Occupation
            </h4>
            <p className="ml-1.5 text-sm">
              {(userInfo && `${userInfo.occupation}`) || "Senior Project Lead"}
            </p>
          </div>

          <div>
            <h4 className="border-b border-solid border-gray-400 mb-2 font-semibold">
              Description
            </h4>
            <p className="ml-1.5 text-sm whitespace-pre-line">
              {(userInfo && `${userInfo.description}`) ||
                "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut, vero."}
            </p>
          </div>

          <Button name="Update information" onClick={updateInfoClicked} />
        </div>
      </aside>

      <main className="w-full max-w-md mx-auto md:mx-0">
        <h4 className="text-gray-800 mt-8 mb-2 text-center font-semibold md:mt-0 md:mb-1">
          Books Information
        </h4>

        <div className="border-2 border-solid border-gray-800 space-y-5 py-3 px-3 font-poppins">
          <div>
            <h4 className="border-b border-solid border-gray-400 mb-2 font-semibold">
              Total books sold
            </h4>
            <p className="ml-1.5 text-sm font-light">
              <span className="text-base font-normal">
                {books?.length || 0}{" "}
              </span>
              Book(s)
            </p>
          </div>

          <div>
            <h4 className="border-b border-solid border-gray-400 mb-2 font-semibold">
              Total revenue
            </h4>
            <p className="ml-1.5 text-sm font-light">
              <span className="text-base font-normal">
                {(function () {
                  let tempNumber = 0;

                  books?.forEach((book) => {
                    if (book?.bookPurchases) {
                      book?.bookPurchases?.forEach(
                        () => (tempNumber += book?.price)
                      );
                    }
                  });

                  return `R${tempNumber} ${
                    tempNumber !== 0 ? "with " + books.length + " books." : ""
                  }`;
                })()}
              </span>
            </p>
          </div>

          <div className="space-y-4">
            {books?.map((book) => (
              <Book
                key={book.id}
                history={history}
                book={book}
                dispatchBook={dispatchBook}
              />
            ))}
          </div>

          <Button
            onClick={() => history.push("/new_book")}
            name="Add new book"
          />
        </div>
      </main>
    </section>
  );
}

export default Account;
