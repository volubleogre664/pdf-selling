import gql from "graphql-tag";

// Loging a user in the app
const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      firstName
      lastName
      email
      occupation
      description
      token
    }
  }
`;

// Registering a user to the app
const REGISTER_USER = gql`
  mutation register(
    $firstName: String!
    $lastName: String!
    $email: String!
    $occupation: String!
    $description: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        occupation: $occupation
        description: $description
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      firstName
      lastName
      email
      occupation
      description
      token
    }
  }
`;

const UPDATE_USER = gql`
  mutation updateUserInfo(
    $firstName: String
    $lastName: String
    $email: String
    $occupation: String
    $description: String
    $newPassword: String
    $confirmNewPassword: String
    $password: String!
    $confirmPassword: String!
  ) {
    updateUserInfo(
      updateInput: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        occupation: $occupation
        description: $description
        newPassword: $newPassword
        confirmNewPassword: $confirmNewPassword
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      firstName
      lastName
      email
      occupation
      description
    }
  }
`;

export { LOGIN_USER, REGISTER_USER, UPDATE_USER };
