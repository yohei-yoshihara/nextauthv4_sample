import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

async function generateHash(password) {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

async function main() {
  await db.user.deleteMany();

  await db.user.create({
    data: {
      username: "user1",
      password: await generateHash("password"),
      role: "user",
    }
  });

  await db.user.create({
    data: {
      username: "user2",
      password: await generateHash("password"),
      role: "user",
    }
  });

  await db.user.create({
    data: {
      username: "admin",
      password: await generateHash("password"),
      role: "admin",
    }
  });
}

main();