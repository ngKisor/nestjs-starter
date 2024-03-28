
import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy users
  const post1 = await prisma.user.upsert({
    where: { username: 'random_username' },
    update: {},
    create: {
      username: 'random_username',
      isVerified: false,
    },
  });

  const post2 = await prisma.user.upsert({
    where: { username: "next_username" },
    update: {},
    create: {
      username: "next_username",
      isVerified: true,
    },
  });

  console.log({ post1, post2 });
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