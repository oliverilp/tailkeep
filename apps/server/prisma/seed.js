const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const user = {
  username: 'admin',
  password:
    '$argon2id$v=19$m=65536,t=3,p=4$hKiyNDuRGvNvmzj/nWSTIA$GbmH7DYM6H7miZEBqnfggLPaLjEBJ8+2hUrs7HnYT98'
};

async function main() {
  await prisma.user.create({
    data: user
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
