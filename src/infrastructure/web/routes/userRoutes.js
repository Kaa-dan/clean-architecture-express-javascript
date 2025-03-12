const express = require("express");

function userRoutes(userController) {
  const router = express.Router();

  router.post("/", userController.createUser.bind(userController));
  router.get("/:id", userController.getUser.bind(userController));

  return router;
}

module.exports = userRoutes;
