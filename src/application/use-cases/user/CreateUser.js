const User = require("../../../domain/entities/User");

class CreateUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(userData) {
    // Create a domain entity
    const user = new User(
      null,
      userData.name,
      userData.email,
      userData.password
    );

    // Apply domain business rules
    user.validateForCreation();

    // Check if user with same email exists
    const existingUser = await this.userRepository.findByEmail(user.email);
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    // Use the repository to persist the entity
    return this.userRepository.create(user);
  }
}

module.exports = CreateUserUseCase;
