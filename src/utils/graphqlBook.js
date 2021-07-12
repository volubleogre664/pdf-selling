import gql from "graphql-tag";

const UPLOAD_BOOK = gql`
  mutation uploadBook(
    $title: String!
    $author: String!
    $price: String!
    $description: String!
    $bookOwner: String!
    $pdfUrl: String!
    $frontCoverUrl: String!
    $backCoverUrl: String!
  ) {
    uploadBook(
      bookInput: {
        title: $title
        author: $author
        price: $price
        description: $description
        bookOwner: $bookOwner
        pdfUrl: $pdfUrl
        frontCoverUrl: $frontCoverUrl
        backCoverUrl: $backCoverUrl
      }
    ) {
      id
      title
      author
      price
      description
      bookOwner
      pdfUrl
      frontCoverUrl
      backCoverUrl
    }
  }
`;

const GET_ONE_BOOK = gql`
  query getOneBook($id: ID!) {
    getOneBook(id: $id) {
      id
      title
      author
      price
      description
      bookOwner
      pdfUrl
      frontCoverUrl
      backCoverUrl
    }
  }
`;

const GET_ALL_BOOKS = gql`
  query getAllBooks($bookOwner: String!) {
    getAllBooks(bookOwner: $bookOwner) {
      id
      title
      author
      price
      description
      bookOwner
      pdfUrl
      frontCoverUrl
      backCoverUrl
    }
  }
`;

export { UPLOAD_BOOK, GET_ONE_BOOK, GET_ALL_BOOKS };
