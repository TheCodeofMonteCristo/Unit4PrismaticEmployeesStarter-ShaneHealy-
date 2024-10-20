// Seed the database with initial employee data
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create 10 initial employees
  for (let i = 1; i <= 10; i++) {
    await prisma.employee.create({
      data: {
        name: `Employee ${i}`,
      },
    });
  }
  console.log('Database seeded with 10 employees');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

  // prisma/seed.js
// This file serves as a seed script for initializing the database with data.
// The actual seeding logic is defined in data/seed.js for clarity and organization.
