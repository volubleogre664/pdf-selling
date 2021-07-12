import { useState } from "react";
import { Redirect } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";

import Button from "../components/Button";
import Input from "../components/Input";
import TextArea from "../components/TextArea";

import { useForm } from "../utils/hooks";
import { UPDATE_USER } from "../utils/graphqlUser";
import Loader from "../components/Loader";

function EditUser({ user, editData }) {
  const [errors, setErrors] = useState();
  const [editEmail, setEditEmail] = useState(false);
  const { values, onChange, onSubmit } = useForm(submitForm, {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    occupation: user.occupation,
    description: user.description,
    newPassword: "",
    confirmNewPassword: "",
    password: "",
    confirmPassword: "",
  });

  // Rework backend bacause my current code changes the passwords also
  const [updateInfo, { loading }] = useMutation(UPDATE_USER, {
    values: filterObject(values),
    update(data) {
      console.log(data.updateUserInfo);
    },
    onError(err) {
      console.log(err);
    },
  });

  const editEmailClicked = (e) => {
    e.preventDefault();

    setEditEmail(!editEmail);
  };

  function submitForm() {
    updateInfo();
  }

  function filterObject(obj) {
    const newObj = {};

    Object.keys(obj).forEach((item) => {
      if (obj[item] !== "") {
        newObj[item] = obj[item];
      }
    });

    return newObj;
  }

  if (!user) return <Redirect to="/" />;

  return (
    <div className="p-5 w-full max-w-md my-auto mx-auto">
      <h4 className="text-gray-800 font-semibold">
        Update Personal Information
      </h4>
      <hr className="w-full mt-1 mb-3 h-0.5 bg-gray-400" />

      <form onSubmit={onSubmit} className="relative flex flex-col gap-3 w-full">
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

        <button
          onClick={editEmailClicked}
          className="block mt-1 text-center py-3 rounded-md font-semibold text-sm text-gray-800 border-2 border-solid border-gray-200 hover:text-black hover:border-gray-800"
        >
          Change email and password
        </button>

        <div
          className={`flex flex-col gap-3 mb-6 w-full ${
            !editEmail && "hidden"
          }`}
        >
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
            {errors && (errors?.newPassword || errors?.confirmNewPassword)}
          </h1>
          <Input
            placeholder="New Password"
            name="newPassword"
            type="password"
            id="newPassword"
            onChange={onChange}
            value={values.newPassword}
            capitalise={false}
          />

          <Input
            placeholder="Confirm New password"
            name="confirmNewPassword"
            type="password"
            id="confirmNewPassword"
            onChange={onChange}
            value={values.confirmNewPassword}
            capitalise={false}
          />
        </div>

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

        <div className="flex flex-col">
          <Button name="Save changes" type="submit" />
          <button
            onClick={(e) =>
              (function () {
                e.preventDefault();
                editData(false);
              })()
            }
            className="block mt-3 text-center py-3 rounded-md font-semibold text-sm text-gray-800 border-2 border-solid border-gray-200 hover:text-black hover:border-gray-800"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditUser;
