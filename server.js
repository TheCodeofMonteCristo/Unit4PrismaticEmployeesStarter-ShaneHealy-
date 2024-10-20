// server.js
const express = require('express'); // Import the Express framework
const bodyParser = require('body-parser'); // Import body-parser middleware for parsing JSON requests
const employeesRoutes = require('./api/employees'); // Import the employee routes

// Initialize the Express application
const app = express();
const PORT = process.env.PORT || 3000; // Set the port for the application

// Middleware for parsing JSON
app.use(bodyParser.json());

// Define routes for the API
app.use('/api', employeesRoutes);

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`); // Log server status to console
});
