class GetUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(userId) {
    if (!userId) {
      throw new Error("User ID is required");
    }

    // Use the repository to fetch the user
    const user = await this.userRepository.findById(userId);

    // Return the domain entity
    return user;
  }
}

module.exports = GetUserUseCase;
