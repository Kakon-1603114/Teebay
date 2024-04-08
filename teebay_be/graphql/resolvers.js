const { prisma } = require("../db/prisma");
const { ApolloError } = require("apollo-server-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { parseISO, isValid } = require("date-fns");

const resolvers = {
  Query: {
    getProductListOfUser: async (_, __, context) => {
      const { userId } = context; // Extracted from the authentication token

      if (!userId) {
        throw new ApolloError("Authentication required.", "UNAUTHORIZED");
      }

      const products = await prisma.product.findMany({
        where: {
          sellerId: userId,
        },
        orderBy: {
          date_posted: "desc",
        },
      });

      return products;
    },
    getProduct: async (_, { id }, context) => {
      const { userId } = context;

      let uid = parseInt(id);
      try {
        const product = await prisma.product.findUnique({
          where: { id: uid },
          include: { seller: true },
        });

        // Update the views count if product is not queried by the seller himself
        if (product.sellerId !== userId) {
          await prisma.product.update({
            where: { id: uid },
            data: { views: product.views + 1 },
          });
        }

        return product;
      } catch (error) {
        throw new ApolloError("Product not found.", "PRODUCT_NOT_FOUND");
      }
    },
    // get all the products from the database
    getAllProducts: async (_, __, context) => {
      const { userId } = context;

      const products = await prisma.product.findMany({
        where: {
          sellerId: {
            not: userId,
          },
          isAvailable: true,
        },
        orderBy: {
          date_posted: "desc",
        },
        include: { seller: true },
      });

      return products;
    },

    getProductsByType: async (_, { type }, context) => {
      const { userId } = context;

      if (!userId) {
        throw new ApolloError("Authentication required.", "UNAUTHORIZED");
      }

      const transactions = await prisma.transaction.findMany({
        where: {
          type,
          userId,
        },
        include: {
          product: {
            include: { seller: true },
          },
        },
        orderBy: {
          createdAt: "desc",
        },

      });

      return transactions;
    },
    getUsersProductByType: async (_, { type }, context) => {
      const { userId } = context;

      if (!userId) {
        throw new ApolloError("Authentication required.", "UNAUTHORIZED");
      }

      const transactions = await prisma.transaction.findMany({
        where: {
          type,
          product: {
            sellerId: userId,
          },
        },
        include: {
          user: true,
          product: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return transactions;
    },
  },
  Mutation: {
    createUser: async (_, { input }) => {
      // Check if user exists
      const existingUser = await prisma.user.findUnique({
        where: { email: input.email },
      });

      // If user exists, throw error
      if (existingUser) {
        throw new ApolloError(
          "User with this email already exists.",
          "USER_EXISTS"
        );
      }

      // If user does not exist, hash password
      let hashedPassword = await bcrypt.hash(input.password, 10);
      input.password = hashedPassword;

      // Create user
      const newUser = await prisma.user.create({
        data: input,
      });

      // Generate token
      const token = jwt.sign(
        {
          userId: newUser.id,
          email: newUser.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      // Add token to user object
      newUser.token = token;

      return newUser;
    },
    loginUser: async (_, { input }) => {
      // Check if user exists
      const existingUser = await prisma.user.findUnique({
        where: { email: input.email },
      });

      // If user does not exist, throw error
      if (!existingUser) {
        throw new ApolloError(
          "User with this email does not exist.",
          "USER_NOT_FOUND"
        );
      }

      // If user exists, check if password is correct
      if (!(await bcrypt.compare(input.password, existingUser.password))) {
        throw new ApolloError("Password is incorrect.", "INCORRECT_PASSWORD");
      }

      // If password is correct, generate token
      const token = jwt.sign(
        {
          userId: existingUser.id,
          email: existingUser.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      // Add token to user object
      existingUser.token = token;

      return existingUser;
    },
    createProduct: async (_, { input }, context) => {
      const { userId } = context;

      if (!userId) {
        throw new ApolloError("Authentication required.", "UNAUTHORIZED");
      }

      // Create product
      const newProduct = await prisma.product.create({
        data: {
          ...input,
          seller: { connect: { id: userId } },
        },
        include: { seller: true },
      });

      return newProduct;
    },
    updateProduct: async (_, { id, input }, context) => {
      const { userId } = context;

      if (!userId) {
        throw new ApolloError("Authentication required.", "UNAUTHORIZED");
      }

      let pid = parseInt(id);
      const product = await prisma.product.findUnique({
        where: { id: pid },
      });

      if (!product) {
        throw new ApolloError("Product not found.", "PRODUCT_NOT_FOUND");
      }

      if (product.sellerId !== userId) {
        throw new ApolloError(
          "You are not the seller of this product.",
          "UNAUTHORIZED"
        );
      }

      const updatedProduct = await prisma.product.update({
        where: { id: pid },
        data: input,
      });

      return updatedProduct;
    },
    deleteProduct: async (_, { id }, context) => {
      const { userId } = context;

      if (!userId) {
        throw new ApolloError("Authentication required.", "UNAUTHORIZED");
      }

      let pid = parseInt(id);
      const product = await prisma.product.findUnique({
        where: { id: pid },
      });

      if (!product) {
        throw new ApolloError("Product not found.", "PRODUCT_NOT_FOUND");
      }

      if (product.sellerId !== userId) {
        throw new ApolloError(
          "You are not the seller of this product.",
          "UNAUTHORIZED"
        );
      }

      // // check product is sold or rented
      // if(product.isAvailable === false){
      //   throw new ApolloError(
      //     "You cannot delete this product because it is sold or rented.",
      //     "PRODUCT_NOT_AVAILABLE"
      //   );
      // }

      // remove transaction record
      await prisma.transaction.deleteMany({
        where: { productId: pid },
      });



      const deletedProduct = await prisma.product.delete({
        where: { id: pid },
      });

      return deletedProduct;
    },
    toggleIsSeller: async (_, __, context) => {
      const { userId } = context;

      if (!userId) {
        throw new ApolloError("Authentication required.", "UNAUTHORIZED");
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { isSeller: !user.isSeller },
      });

      return updatedUser.isSeller;
    },
    buyProduct: async (_, { productId }, context) => {
      const { userId } = context;

      if (!productId) {
        throw new ApolloError("Product id is required.", "PRODUCT_ID_REQUIRED");
      }
      if (!userId) {
        throw new ApolloError("Authentication required.", "UNAUTHORIZED");
      }

      // Find the product by productId
      const product = await prisma.product.findUnique({
        where: { id: parseInt(productId), isAvailable: true },
      });

      if (!product) {
        throw new ApolloError("Product not found.", "PRODUCT_NOT_FOUND");
      }

      // Check if product is owned by the user
      if (product.sellerId === userId) {
        throw new ApolloError(
          "You cannot buy your own product.",
          "UNAUTHORIZED"
        );
      }

      // Create a new transaction record
      const newTransaction = await prisma.transaction.create({
        data: {
          type: "buy",
          user: { connect: { id: userId } },
          product: { connect: { id: parseInt(productId) } },
        },
        include: {
          product: {
            include: { seller: true },
          },
        }, // Include the product in the result
      });

      // Update the product views count and availability
      await prisma.product.update({
        where: { id: parseInt(productId) },
        data: {
          views: product.views + 1,
          isAvailable: false,
        },
      });

      return newTransaction; // Return the transaction with the included product details
    },
    rentProduct: async (_, { productId, rentedFrom, rentedUntil }, context) => {
      const { userId } = context;

      if (!productId) {
        throw new ApolloError("Product id is required.", "PRODUCT_ID_REQUIRED");
      }
      if (!userId) {
        throw new ApolloError("Authentication required.", "UNAUTHORIZED");
      }

      // Find the product by productId
      const product = await prisma.product.findUnique({
        where: { id: parseInt(productId), isAvailable: true },
      });

      if (!product) {
        throw new ApolloError(
          "Product not found or not available for rent.",
          "PRODUCT_NOT_FOUND"
        );
      }

      // Check if product is owned by the user
      if (product.sellerId === userId) {
        throw new ApolloError(
          "You cannot rent your own product.",
          "UNAUTHORIZED"
        );
      }

      // Parse and validate the dates
      const parsedRentedFrom = parseISO(rentedFrom);
      const parsedRentedUntil = parseISO(rentedUntil);

      if (!isValid(parsedRentedFrom) || !isValid(parsedRentedUntil)) {
        throw new ApolloError("Invalid date format.", "INVALID_DATE_FORMAT");
      }

      // Check if rentedUntil is after rentedFrom
      if (parsedRentedUntil <= parsedRentedFrom) {
        throw new ApolloError(
          "rentedUntil must be after rentedFrom.",
          "INVALID_DATE_RANGE"
        );
      }

      // Create a new transaction record
      const newTransaction = await prisma.transaction.create({
        data: {
          type: "rent",
          user: { connect: { id: userId } },
          product: { connect: { id: parseInt(productId) } },
          rentedFrom: parsedRentedFrom,
          rentedUntil: parsedRentedUntil,
        },
        include: { product: true }, // Include the product in the result
      });

      // Update the product availability
      await prisma.product.update({
        where: { id: parseInt(productId) },
        data: {
          isAvailable: false,
        },
      });

      return newTransaction; // Return the transaction with the included product details
    },
  },
};

module.exports = { resolvers };
