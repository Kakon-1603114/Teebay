const cron = require("node-cron");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const rentExpirationJob = cron.schedule("0 0 * * *", async () => {
    console.log("Running rent expiration job.");
  try {
    const currentDate = new Date();

    const expiredTransactions = await prisma.transaction.findMany({
      where: {
        type: "rent",
        rentedUntil: {
          lte: currentDate, // Rent until is expired
        },
      },
    });

    for (const transaction of expiredTransactions) {
      await prisma.product.update({
        where: { id: transaction.productId },
        data: {
          isAvailable: true,
        },
      });
    }

    console.log("Product availability updated for expired rents.");
  } catch (error) {
    console.error("Error updating product availability:", error);
  }
});

module.exports = { rentExpirationJob };
