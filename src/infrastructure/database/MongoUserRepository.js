// src/infrastructure/database/MongoUserRepository.js
const mongoose = require("mongoose");
const UserRepository = require("../../application/interfaces/UserRepository");
const User = require("../../domain/entities/User");

// Define MongoDB schema and model
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const UserModel = mongoose.model("User", UserSchema);

class MongoUserRepository extends UserRepository {
  async create(user) {
    const newUser = new UserModel({
      name: user.name,
      email: user.email,
      password: user.password, // In real app, password should be hashed
    });

    const savedUser = await newUser.save();

    // Map from DB model to domain entity
    return new User(
      savedUser._id.toString(),
      savedUser.name,
      savedUser.email,
      savedUser.password
    );
  }

  async findById(id) {
    const user = await UserModel.findById(id);
    if (!user) return null;

    return new User(user._id.toString(), user.name, user.email, user.password);
  }

  async findByEmail(email) {
    const user = await UserModel.findOne({ email });
    if (!user) return null;

    return new User(user._id.toString(), user.name, user.email, user.password);
  }
}

module.exports = MongoUserRepository;
