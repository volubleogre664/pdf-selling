import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  books: null,
  dispatched: false,
  currentBook: null,
};

if (localStorage.getItem("books")) {
  initialState.books = JSON.parse(localStorage.getItem("books"));
}

const book = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook(state, action) {
      if (!state.books) {
        state.books = [];
      }

      state.books.push(action.payload);
      state.dispatched = true;
      localStorage.setItem("books", JSON.stringify(state.books));
    },
    setBooks(state, action) {
      state.books = action.payload;
      state.dispatched = true;
      localStorage.setItem("books", JSON.stringify(state.books));
    },
    setCurrentBook(state, action) {
      state.currentBook = action.payload;
    },
  },
});

export const { addBook, setBooks, setCurrentBook } = book.actions;
export const selectBooks = (state) => state.book;
export default book.reducer;
