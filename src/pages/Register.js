import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";

import { useForm } from "../utils/hooks";
import { useUserSlice } from "../redux/getState";
import { REGISTER_USER } from "../utils/graphqlUser";

import TextArea from "../components/TextArea";
import Button from "../components/Button";
import Input from "../components/Input";
import Loader from "../components/Loader";

function Register({ history }) {
  const [{ data: userInfo }, dispatch] = useUserSlice();
  const [errors, setErrors] = useState();
  const { onChange, values, onSubmit } = useForm(registerUser, {
    firstName: "",
    lastName: "",
    email: "",
    occupation: "",
    description: "",
    password: "",
    confirmPassword: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    variables: values,
    update(_, { data: { register: userData } }) {
      dispatch({
        payload: userData,
      });

      history.push("/");
    },
    onError(err) {
      setErrors(err?.graphQLErrors[0]?.extensions?.errors);
    },
  });

  function registerUser() {
    addUser();
  }

  useEffect(() => {
    document.title = "PDF Store | Register Account";
  });

  if (userInfo) {
    history.push("/");
  }

  return (
    <div className="p-5 w-full max-w-md mx-auto">
      <h1 className="text-xl font-poppins font-semibold mb-2">
        Register account
      </h1>

      <form
        onSubmit={onSubmit}
        className="flex overflow-hidden relative flex-col gap-4 w-full"
      >
        {loading && <Loader />}

        <h1 className=" text-red-700 text-sm -mb-4">
          {errors && errors?.names}
        </h1>
        <Input
          placeholder="First name(s)"
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
          capitalise={false}
        />

        <h1 className=" text-red-700 text-sm -mb-4">
          {errors && errors?.email}
        </h1>
        <Input
          placeholder="Email Address"
          name="email"
          type="email"
          id="email"
          onChange={onChange}
          value={values.email}
          capitalise={false}
        />

        <h1 className=" text-red-700 text-sm -mb-4">
          {errors && errors?.occupation}
        </h1>
        <Input
          placeholder="Occupation"
          name="occupation"
          type="text"
          id="occupation"
          onChange={onChange}
          value={values.occupation}
          capitalise={false}
        />

        <h1 className=" text-red-700 text-sm -mb-4">
          {errors && errors?.description}
        </h1>
        <TextArea
          name="description"
          id="description"
          value={values.description}
          onChange={onChange}
          placeholder="About you"
          onKeyDown={(e) => e.key === "enter" && values.description + "\n"}
        />

        <h1 className=" text-red-700 text-sm -mb-4">
          {errors && (errors?.password || errors?.confirmPassword)}
        </h1>
        <Input
          placeholder="Password"
          name="password"
          type="password"
          id="password"
          onChange={onChange}
          value={values.password}
          capitalise={false}
        />

        <Input
          placeholder="Confirm password"
          name="confirmPassword"
          type="password"
          id="confirmPassword"
          onChange={onChange}
          value={values.confirmPassword}
          capitalise={false}
        />

        <p className="text-sm w-fit ml-auto text-gray-500 font-light">
          Already have an account?{" "}
          <Link
            className="text-gray-800 font-semibold hover:text-blue-600"
            to="/login"
          >
            Log in
          </Link>
        </p>

        <div className="flex flex-col">
          <Button name="Create account" type="submit" />
          <Link
            to="/"
            className="block mt-3 text-center py-3 rounded-md font-semibold text-sm text-gray-800 border-2 border-solid border-gray-200 hover:text-black hover:border-gray-800"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
