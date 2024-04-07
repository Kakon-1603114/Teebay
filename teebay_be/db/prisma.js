const { PrismaClient } = require("@prisma/client");

// Instantiate the Prisma Client
const prisma = new PrismaClient();

// Export the Prisma Client instance
module.exports = { prisma };
