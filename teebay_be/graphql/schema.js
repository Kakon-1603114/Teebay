const { gql } = require("apollo-server-express");

const typeDefs = gql`
  input CreateUserInput {
    firstname: String!
    lastname: String!
    password: String!
    email: String!
    address: String!
    phone: String!
  }

  input LoginUserInput {
    email: String!
    password: String!
  }

  input CreateProductInput {
    title: String!
    price: Int!
    rent: Int!
    rent_type: String!
    categories: [String!]!
    description: String!
  }

  input UpdateProductInput {
    title: String
    price: Int
    rent: Int
    rent_type: String
    categories: [String!]
    description: String
  }

  type Product {
    id: ID!
    title: String!
    price: Int!
    rent: Int!
    rent_type: String!
    categories: [String!]!
    description: String!
    date_posted: String
    views: Int
    seller: User
    isAvailable: Boolean
  }

  type User {
    id: ID!
    firstname: String!
    lastname: String!
    password: String!
    email: String!
    address: String!
    phone: String!
    token: String
    isSeller: Boolean
  }

  type Transection {
    id: ID!
    type: String!
    user: User!
    product: Product!
    createdAt: String!
    rentedUntil: String
    rentedFrom: String
  }

  type Query {
    getProduct(id: ID!): Product
    getProductListOfUser: [Product!]!
    getAllProducts: [Product!]!
    getProductsByType(type: String!): [Transection!]!
    getUsersProductByType(type: String!): [Transection!]!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    loginUser(input: LoginUserInput!): User
    createProduct(input: CreateProductInput!): Product!
    updateProduct(id: ID!, input: UpdateProductInput): Product!
    deleteProduct(id: ID!): Product!
    toggleIsSeller: Boolean!
    buyProduct(productId: ID!): Transection!
    rentProduct(
      productId: ID!
      rentedFrom: String!
      rentedUntil: String!
    ): Transection!
  }
`;

module.exports = { typeDefs };
