import { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";

import { useForm } from "../utils/hooks";
import { LOGIN_USER } from "../utils/graphqlUser";
import { useUserSlice } from "../redux/getState";

import Button from "../components/Button";
import Input from "../components/Input";
import Loader from "../components/Loader";

function Login({ history }) {
  const [{ data: userInfo }, dispatch] = useUserSlice();
  const [errors, setErrors] = useState();
  const { onChange, values, onSubmit } = useForm(loginUser, {
    email: "",
    password: "",
  });

  const [authUser, { loading }] = useMutation(LOGIN_USER, {
    variables: values,
    update(_, { data: { login: userData } }) {
      dispatch({
        payload: userData,
      });
      // console.log(userData);
      history.push("/");
    },
    onError(err) {
      setErrors(err?.graphQLErrors[0]?.extensions?.errors);
    },
  });

  function loginUser() {
    authUser();
  }

  useEffect(() => {
    document.title = "PDF Store | Login";
  }, []);

  if (userInfo) {
    return <Redirect to="/" />;
  }

  return (
    <div className="p-5 w-full max-w-md my-auto mx-auto">
      <h1 className="text-xl font-poppins font-semibold mb-2">User login</h1>

      <h1 className=" text-red-700 text-sm">
        {errors && "Incorrect email or password"}
      </h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-3 w-full">
        {loading && <Loader />}
        <Input
          placeholder="Email Address"
          name="email"
          type="email"
          id="email"
          onChange={onChange}
          value={values.email}
          capitalise={false}
          required={true}
        />

        <Input
          placeholder="Password"
          name="password"
          type="password"
          id="password"
          onChange={onChange}
          value={values.password}
          capitalise={false}
          required={true}
        />

        <p className="text-sm w-fit ml-auto text-gray-500 font-light">
          Don't have an account?{" "}
          <Link
            className="text-gray-800 font-semibold hover:text-blue-600"
            to="/register"
          >
            Register
          </Link>
        </p>

        <Button type="submit" name="Log in" />
      </form>
    </div>
  );
}

export default Login;
