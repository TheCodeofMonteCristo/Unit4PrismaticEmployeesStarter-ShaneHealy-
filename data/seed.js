// data/seed.js
const { PrismaClient } = require('@prisma/client'); // Import Prisma Client to interact with the database
const prisma = new PrismaClient(); // Initialize Prisma Client

async function main() {
  // Loop to create and seed 10 initial employees
  for (let i = 1; i <= 10; i++) {
    await prisma.employee.create({ // Create a new employee record in the database
      data: {
        name: `Employee ${i}`, // Name is set to "Employee 1", "Employee 2", etc.
      },
    });
  }
  console.log('Database seeded with 10 employees'); // Log a message indicating seeding is complete
}

// Execute the main function and handle errors
main()
  .catch(e => {
    console.error(e); // Log any errors that occur
    process.exit(1); // Exit the process with a failure code
  })
  .finally(async () => {
    await prisma.$disconnect(); // Disconnect from the database
  });
