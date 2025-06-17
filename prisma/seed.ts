import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding...");

  console.log("Seeding users...");
  await prisma.user.upsert({
    where: { email: "alice@example.com" },
    update: {},
    create: {
      email: "alice@example.com",
      name: "Alice",
      posts: {
        create: [
          {
            title: "My First Post",
            content: "This is the content of my first post.",
          },
          {
            title: "Another Post",
            content: "Learning Next.js and Prisma!",
            published: true,
          },
        ],
      },
    },
  });

  console.log("Seeding users...");
  await prisma.user.upsert({
    where: { email: "bob@example.com" },
    update: {},
    create: {
      email: "bob@example.com",
      name: "Bob",
      posts: {
        create: [
          {
            title: "Bob's Blog",
            content: "Thoughts on software engineering.",
            published: true,
          },
        ],
      },
    },
  });

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
