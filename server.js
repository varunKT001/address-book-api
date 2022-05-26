// load env-vars
require('dotenv').config();

// importing express
const express = require('express');

// importing database connection module
const connectToDatabase = require('./config/db');

// importing middlewares
const ErrorMiddleware = require('./middlewares/Error');
const AuthMiddleware = require('./middlewares/Auth');

// importing routers
const authRouter = require('./routers/auth');
const contactRouter = require('./routers/contact');

// initializing an express app
const app = express();

// uncaught exception
process.on('uncaughtException', (error) => {
  console.log(`Error: ${error.message}`);
  console.log(`Server shutting down due to uncaught exception`);
  process.exit(1);
});

// unhandled promise rejection
process.on('unhandledRejection', (error) => {
  console.log(`Error: ${error.message}`);
  console.log(`Server shutting down due to unhandled promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});

// connecting to database
connectToDatabase();

// using other middlewares
app.use(express.json());

// routing request
app.use('/api/auth', authRouter);
app.use('/api/contact', contactRouter);

// using error middleware
app.use(ErrorMiddleware);

// starting the server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT} 🚀`);
});
