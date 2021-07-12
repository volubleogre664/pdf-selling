import { useDispatch, useSelector } from "react-redux";
import {
  addBook,
  selectBooks,
  setBooks,
  setCurrentBook,
} from "./features/book";
import {
  setUser,
  logoutUser,
  selectFromUser,
  setInstallPrompt,
} from "./features/user";

// This is a hook for handling user relations
function useUserSlice() {
  const dispatch = useDispatch();

  const dispatchUser = (action) => {
    switch (action?.type) {
      case "SET_INSTALL_FLAG": {
        dispatch(setInstallPrompt(action.payload));
        break;
      }

      case "LOGOUT_USER": {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("books");
        dispatch(logoutUser());
        break;
      }

      default: {
        localStorage.setItem("jwtToken", action.payload.token);
        dispatch(setUser(action.payload));
      }
    }
  };

  const user = useSelector(selectFromUser);
  return [user, dispatchUser];
}

// This is hook for handling the books relations
function useBooksSlice() {
  const dispatch = useDispatch();

  const dispatchBook = (action) => {
    switch (action?.type) {
      case "SET_BOOKS": {
        dispatch(setBooks(action.payload));
        break;
      }

      case "SET_CURRENT_BOOK": {
        dispatch(setCurrentBook(action.payload));
        break;
      }

      default:
        dispatch(addBook(action.payload));
    }
  };

  const books = useSelector(selectBooks);

  return [books, dispatchBook];
}

export { useUserSlice, useBooksSlice };
