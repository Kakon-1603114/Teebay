import { gql } from "@apollo/client";

const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      firstname
      lastname
      email
      address
      phone
      id
    }
  }
`;

const LOGIN_USER = gql`
  mutation LoginUser($input: LoginUserInput!) {
    loginUser(input: $input) {
      email
      id
      token
      isSeller
      firstname
    }
  }
`;

const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
      title
      price
      rent
    }
  }
`;

const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {
    updateProduct(id: $id, input: $input) {
      id
      title
      price
      rent
      rent_type
      categories
      description
      date_posted
      views
    }
  }
`;

const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      id
    }
  }
`;

const TOGGLE_IS_SELLER = gql`
  mutation ToggleIsSeller {
    toggleIsSeller
  }
`;

const BUY_PRODUCT_MUTATION = gql`
  mutation BuyProduct($productId: ID!) {
    buyProduct(productId: $productId) {
      type
      id
      product {
        title
        id
      }
    }
  }
`;

const RENT_PRODUCT_MUTATION = gql`
  mutation RentProduct(
    $productId: ID!
    $rentedFrom: String!
    $rentedUntil: String!
  ) {
    rentProduct(
      productId: $productId
      rentedFrom: $rentedFrom
      rentedUntil: $rentedUntil
    ) {
      product {
        title
        price
      }
    }
  }
`;

export {
  RENT_PRODUCT_MUTATION,
  BUY_PRODUCT_MUTATION,
  TOGGLE_IS_SELLER,
  CREATE_USER,
  LOGIN_USER,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
};
