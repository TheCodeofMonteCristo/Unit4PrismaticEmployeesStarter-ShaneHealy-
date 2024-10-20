// api/employees.js
const express = require('express'); // Import the Express framework
const { PrismaClient } = require('@prisma/client'); // Import Prisma Client for database operations

const router = express.Router(); // Create a new Express Router instance
const prisma = new PrismaClient(); // Initialize Prisma Client

// Route for the welcome message
router.get('/', (req, res) => {
  res.send('Welcome to the Prismatic Employees API.'); // Respond with a welcome message
});

// Route to get all employees
router.get('/employees', async (req, res) => {
  const employees = await prisma.employee.findMany(); // Fetch all employees from the database
  res.json(employees); // Respond with the list of employees in JSON format
});

// Route to add a new employee
router.post('/employees', async (req, res) => {
  const { name } = req.body; // Extract the name from the request body
  if (!name) {
    return res.status(400).json({ error: 'Name is required.' }); // Send 400 error if name is not provided
  }
  const employee = await prisma.employee.create({ data: { name } }); // Create a new employee record
  res.status(201).json(employee); // Respond with the newly created employee and a 201 status
});

// Route to get an employee by ID
router.get('/employees/:id', async (req, res) => {
  const { id } = req.params; // Extract the ID from the route parameters
  const employee = await prisma.employee.findUnique({ where: { id: Number(id) } }); // Fetch employee by ID
  if (!employee) {
    return res.status(404).json({ error: 'Employee not found.' }); // Send 404 error if employee does not exist
  }
  res.json(employee); // Respond with the employee data
});

// Route to update an employee by ID
router.put('/employees/:id', async (req, res) => {
  const { id } = req.params; // Extract the ID from the route parameters
  const { name } = req.body; // Extract the name from the request body
  if (!name) {
    return res.status(400).json({ error: 'Name is required.' }); // Send 400 error if name is not provided
  }
  const employee = await prisma.employee.update({
    where: { id: Number(id) }, // Find the employee by ID
    data: { name }, // Update the employee's name
  });
  if (!employee) {
    return res.status(404).json({ error: 'Employee not found.' }); // Send 404 error if employee does not exist
  }
  res.json(employee); // Respond with the updated employee data
});

// Route to delete an employee by ID
router.delete('/employees/:id', async (req, res) => {
  const { id } = req.params; // Extract the ID from the route parameters
  try {
    await prisma.employee.delete({ where: { id: Number(id) } }); // Delete the employee by ID
    res.sendStatus(204); // Respond with 204 status (No Content)
  } catch {
    res.status(404).json({ error: 'Employee not found.' }); // Send 404 error if employee does not exist
  }
});

module.exports = router; // Export the router for use in server.js
