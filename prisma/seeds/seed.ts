
import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {

  // create two dummy users
  const user1 = await prisma.user.upsert({
    where: { email: 'email@gmail.com' },
    update: {},
    create: {
      email: 'email@gmail.com',
      isVerified: false,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: "email1@gmail.com" },
    update: {},
    create: {
      email: "email1@gmail.com",
      isVerified: true,
    },
  });

  console.log({ user1, user2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });