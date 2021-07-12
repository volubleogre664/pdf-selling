import { Link } from "react-router-dom";
import ArrowBack from "@material-ui/icons/ArrowBackIosOutlined";

import Button from "../../components/Button";
import Steps from "../../components/Steps";

function BuyBookShipping() {
  return (
    <main className="space-y-6 font-poppins">
      <Steps active={2} items={["Infomation", "Shipping", "Payment"]} />

      <section className="mt-3 p-3 border border-solid border-gray-400 text-sm rounded-md font-normal">
        <div className="flex sm:flex-col">
          <div className="w-3/4">
            <h4 className="text-gray-400">Contact</h4>
            <p className="text-gray-700">nduduzos820@gmail.com</p>
          </div>
          <span className="rounded-md cursor-pointer px-2.5 py-1.5 hover:shadow-md h-fit">
            change
          </span>
        </div>

        <hr className="my-3" />

        <div className="flex sm:flex-col">
          <div className="w-3/4">
            <h4 className="text-gray-400">Ship to</h4>
            <p className="text-gray-700">
              8042 Suriya street, Leondale, Germiston, Gauteng, South Africa,
              1401
            </p>
          </div>
          <span className="rounded-md cursor-pointer px-2.5 py-1.5 hover:shadow-md h-fit">
            change
          </span>
        </div>
      </section>

      <section>
        <h1 className="text-lg font-serif mb-2">Shipping Method</h1>
        <div className="flex items-center p-3 border border-solid border-gray-400 rounded-md">
          <label htmlFor="shipping" className="flex-1 flex items-center">
            <input
              className="mr-3 w-5 h-5"
              checked
              type="radio"
              name="shipping"
              id="shipping"
            />{" "}
            Gauteng
          </label>

          <span className="text-sm">R150.67</span>
        </div>
      </section>

      <div className="flex flex-col">
        <Button name="Continue to payment" />
        <Link className="block mt-3 text-center py-3 rounded-md font-semibold text-sm text-gray-800 border-2 border-solid border-gray-200 hover:text-black hover:border-gray-800">
          <ArrowBack style={{ fontSize: 1 + "rem" }} /> Return to information
        </Link>
      </div>
    </main>
  );
}

export default BuyBookShipping;
