class User {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  isValidEmail() {
    return /\S+@\S+\.\S+/.test(this.email);
  }

  // Business rules go here
  validateForCreation() {
    if (!this.name || this.name.length < 2) {
      throw new Error("Name must be at least 2 characters");
    }

    if (!this.isValidEmail()) {
      throw new Error("Invalid email format");
    }

    if (!this.password || this.password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }

    return true;
  }
}

module.exports = User;
