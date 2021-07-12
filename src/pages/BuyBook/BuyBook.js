import BuyBookInformation from "./BuyBookInformation";
// import BuyBookShipping from "./BuyBookShipping";

function BuyBook() {
  return (
    <div className="flex-1 mx-5 my-4">
      <BuyBookInformation />
      {/* <BuyBookShipping /> */}
    </div>
  );
}

export default BuyBook;
