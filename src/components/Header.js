import { useState } from "react";
import { Link } from "react-router-dom";
import MenuOutlinedIcon from "@material-ui/icons/MenuOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";

import { useUserSlice } from "../redux/getState";

function Header() {
  const [click, setClick] = useState(false);
  const [{ data: userInfo }, dispatch] = useUserSlice();

  // document.onclick = () => {
  //   if (click) {
  //     setClick(!click);
  //   }
  // };

  return (
    <header className="w-full border-b-2 border-gray-50 border-solid sticky top-0 z-50 flex flex-wrap xsm:items-center space px-5 py-4 h-auto bg-gray-800 shadow-sm sm:px-16">
      <Link
        to="/"
        className="font-extrabold cursor-pointer text-3xl font-sans-serif text-gray-50"
      >
        BookSell
      </Link>

      <div
        className="w-auto xsm:hidden place-self-end ml-auto"
        onClick={() => setClick(!click)}
      >
        {click ? (
          <CloseOutlinedIcon
            style={{ fontSize: 2.5 + "rem" }}
            className="text-gray-50 h-auto ml-auto cursor-pointer hover:text-gray-600"
          />
        ) : (
          <MenuOutlinedIcon
            style={{ fontSize: 2.5 + "rem" }}
            className="text-gray-50 w-8 h-auto place-self-center ml-auto cursor-pointer hover:text-gray-600"
          />
        )}
      </div>

      <nav
        className={`w-full px-4 py-3 duration-300 transition-all border-t-2 border-gray-50 border-solid absolute top-full left-0 flex bg-gray-800 flex-col xsm:border-t-0 xsm:ml-auto xsm:flex-row xsm:w-auto xsm:relative xsm:left-0 xsm:top-0 xsm:py-0 xsm:px-0 xsm:gap-2 ${
          click ? "left-0" : "left-full"
        }`}
      >
        <MenuItem
          icon="fas fa-home"
          to="/"
          name="Home"
          onClick={() => setClick(!click)}
        />
        {!userInfo ? (
          <>
            <MenuItem
              to="/login"
              name="Login"
              icon="fas fa-sign-in-alt"
              onClick={() => setClick(!click)}
            />
            <MenuItem
              to="/register"
              name="Register"
              icon="fas fa-user-plus"
              onClick={() => setClick(!click)}
            />
          </>
        ) : (
          <MenuItem
            to="/login"
            name="Logout"
            icon="fas fa-sign-out-alt"
            onClick={() =>
              (function () {
                setClick(!click);
                dispatch({ type: "LOGOUT_USER" });
              })()
            }
          />
        )}
      </nav>
    </header>
  );
}

function MenuItem({ onClick, to, name, icon }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="text-xl py-2 px-4 hover:bg-gray-700 hover:text-gray-50 font-semibold text-gray-400"
    >
      <i className={`${icon} xsm:hidden mx-2.5 text-white text-lg`}></i>
      {name}
    </Link>
  );
}

export default Header;
