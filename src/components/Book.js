function Book({ history, book, dispatchBook }) {
  const handleHomeBookClick = () => {
    dispatchBook({
      type: "SET_CURRENT_BOOK",
      payload: book,
    });

    history.push("/viewBook#" + book.id);
  };

  return (
    <div
      onClick={handleHomeBookClick}
      className="flex gap-4 font-serif group text-gray-600 p-3 text-sm bg-gray-50 duration-300 transition-all select-none cursor-pointer rounded-sm shadow-md hover:bg-gray-800 hover:text-gray-200"
    >
      <img
        className="w-1/4 object-contain text-gray-600 text-sm self-start line-clamp-2 overflow-hidden"
        src={book?.frontCoverUrl}
        alt="The Lean Startup: How Today's Entrepreneurs Use Continuous Innovation
        to Create Radically Successful Businesses"
      />

      <div className="flex flex-col">
        <p className="line-clamp-1 overflow-hidden font-semibold">
          {book?.title}
        </p>
        <p className="line-clamp-1">{book?.author}</p>
        <p className="text-gray-400">Electronic copy</p>
        <p className="font-black text-xl text-red-500 transition-colors group-hover:text-blue-400">
          {"R" + book?.price}
        </p>
      </div>
    </div>
  );
}

export default Book;
