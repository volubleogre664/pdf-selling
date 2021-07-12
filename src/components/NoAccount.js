import { Link } from "react-router-dom";

function NoAccount() {
  return (
    <div className="flex flex-col text-center w-4/5 m-auto gap-2 bg-gray-300 shadow-lg rounded-md p-4">
      <p className="text-start text-xl font-light">No account found</p>
      <Link
        className="px-2 py-3 text-white rounded-md transition-all hover:bg-blue-500 hover:text-gray-800 font-bold bg-gray-700 w-auto"
        to="/login"
      >
        Login
      </Link>
      <span className="font-bold">OR</span>
      <Link
        className="px-2 py-3 text-white font-bold rounded-md transition-all hover:bg-blue-500 hover:text-gray-800 bg-gray-700 w-auto"
        to="/signup"
      >
        Register Account
      </Link>
    </div>
  );
}

export default NoAccount;
