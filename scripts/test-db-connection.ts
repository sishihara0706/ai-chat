import "dotenv/config";
import { PrismaClient } from "@prisma/client";

async function main() {
  const prisma = new PrismaClient();

  try {
    // MongoDBに接続テスト
    await prisma.$connect();
    console.log("MongoDB connection successful!");

    // 簡単なクエリテスト
    const conversationCount = await prisma.conversation.count();
    console.log(`Current conversation count: ${conversationCount}`);

    console.log("Database connection test passed!");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
