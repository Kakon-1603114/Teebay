import { gql } from "@apollo/client";

// Get all products of this user and sort by date posted
const GET_PRODUCT_LIST_OF_USER = gql`
  query GetProductListOfUser {
    getProductListOfUser {
      id
      title
      price
      rent
      rent_type
      categories
      description
      date_posted
      views
      isAvailable
    }
  }
`;

// Get Product by ID
const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      title
      price
      rent
      rent_type
      categories
      description
      date_posted
      isAvailable
    }
  }
`;

const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    getAllProducts {
      id
      title
      price
      rent
      rent_type
      categories
      description
      date_posted
      views
      isAvailable
    }
  }
`;

const GET_PRODUCTS_BY_TYPE = gql`
  query GetProductsByType($type: String!) {
    getProductsByType(type: $type) {
      product {
        id
        title
        price
        rent
        rent_type
        categories
        description
        date_posted
        views
        isAvailable
      }
    }
  }
`;
const GET_USERS_PRODUCTS_BY_TYPE = gql`
  query GetUsersProductByType($type: String!) {
    getUsersProductByType(type: $type) {
      product {
        id
        title
        price
        rent
        rent_type
        categories
        description
        date_posted
        views
        isAvailable
      }
    }
  }
`;

export {
  GET_USERS_PRODUCTS_BY_TYPE,
  GET_ALL_PRODUCTS,
  GET_PRODUCT_LIST_OF_USER,
  GET_PRODUCT,
  GET_PRODUCTS_BY_TYPE,
};
