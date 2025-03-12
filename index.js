const express = require("express");
const mongoose = require("mongoose");

const MongoUserRepository = require("./src/infrastructure/database/MongoUserRepository");
const CreateUserUseCase = require("./src/application/use-cases/user/CreateUser");
const GetUserUseCase = require("./src/application/use-cases/user/GetUser");
const UserController = require("./src/infrastructure/web/controllers/UserController");
const userRoutes = require("./src/infrastructure/web/routes/userRoutes");

// Initialize Express
const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/cleanarchdb")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Setup dependencies
const userRepository = new MongoUserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);
const getUserUseCase = new GetUserUseCase(userRepository);
const userController = new UserController(createUserUseCase, getUserUseCase);

// Setup routes
app.use("/users", userRoutes(userController));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
