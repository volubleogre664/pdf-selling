import { Link } from "react-router-dom";
// import ShippingIcon from "@material-ui/icons/LocalShippingOutlined";
import ArrowBack from "@material-ui/icons/ArrowBackIosOutlined";

import Input from "../../components/Input";
import Steps from "../../components/Steps";
import { useForm } from "../../utils/hooks";
import Button from "../../components/Button";

function BuyBookInformation() {
  const { onChange, values } = useForm(null, {
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    country: "South Africa",
    province: "",
    postalCode: "",
    phoneNumber: "",
  });

  return (
    <section className="max-w-md mx-auto">
      <Steps active={1} items={["Infomation", "Shipping", "Payment"]} />
      <form>
        <div className="space-y-5">
          <div>
            <h1 className="text-lg font-serif mb-2">Contact Information</h1>

            <div>
              <Input
                placeholder="Email"
                name="email"
                type="email"
                id="email"
                onChange={onChange}
                value={values.email}
                capitalise={true}
              />
              <p className="text-sm w-fit ml-auto text-gray-500 mt-1 font-light">
                To confirm your identity in future
                {/* <Link
                  className="text-gray-800 font-semibold hover:text-blue-600"
                  to="/login"
                >
                  Log in
                </Link> */}
              </p>
            </div>
          </div>

          {/* <div>
            <h1 className="text-lg font-serif mb-2">Shipping Method</h1>
            <div className="flex items-center p-3 border border-solid border-gray-400 rounded-md">
              <label htmlFor="shipping" className="flex items-center">
                <input
                  className="mr-3 w-5 h-5"
                  checked
                  type="radio"
                  name="shipping"
                  id="shipping"
                />{" "}
                <ShippingIcon className="mr-1" /> Ship
              </label>
            </div>
          </div> */}

          <div>
            <h1 className="text-lg font-serif mb-2">Personal Information</h1>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-3">
                <Input
                  placeholder="First name"
                  name="firstName"
                  type="text"
                  id="firstName"
                  onChange={onChange}
                  value={values.firstName}
                  capitalise={true}
                />

                <Input
                  placeholder="Last name"
                  name="lastName"
                  type="text"
                  id="lastName"
                  onChange={onChange}
                  value={values.lastName}
                  capitalise={true}
                />
              </div>

              <div>
                {/* <Input
                  placeholder="Shipping Address"
                  name="address"
                  type="text"
                  id="address"
                  onChange={onChange}
                  value={values.address}
                  capitalise={true}
                />

                <Input
                  placeholder="City"
                  name="city"
                  type="text"
                  id="city"
                  onChange={onChange}
                  value={values.city}
                  capitalise={true}
                />

                <Input
                  placeholder="Country | Region"
                  name="country"
                  type="text"
                  id="country"
                  onChange={onChange}
                  value={values.country}
                  capitalise={true}
                />

                <Input
                  placeholder="Province"
                  name="province"
                  type="text"
                  id="province"
                  onChange={onChange}
                  value={values.province}
                  capitalise={true}
                />

                <Input
                  placeholder="Postal Code"
                  name="postalCode"
                  type="text"
                  id="postalCode"
                  onChange={onChange}
                  value={values.postalCode}
                  capitalise={true}
                />

                <Input
                  placeholder="Phone Number"
                  name="phoneNumber"
                  type="text"
                  id="phoneNumber"
                  onChange={onChange}
                  value={values.phoneNumber}
                  capitalise={true}
                /> */}
              </div>

              {/* <div>
                <label
                  className="cursor-pointer font-poppins font-light text-gray-500 flex items-center text-sm"
                  htmlFor="save_for_later"
                >
                  <input
                    className="mr-3 cursor-pointer w-4 h-4"
                    type="checkbox"
                    name="saveInfo"
                    id="save_for_later"
                  />
                  Save details for next time
                </label>
              </div> */}

              <div className="flex flex-col">
                <Button name="Finish purchase" />
                <Link className="block mt-3 text-center py-3 rounded-md font-semibold text-sm text-gray-800 border-2 border-solid border-gray-200 hover:text-black hover:border-gray-800">
                  <ArrowBack style={{ fontSize: 1 + "rem" }} /> Cancel purchase
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

export default BuyBookInformation;
