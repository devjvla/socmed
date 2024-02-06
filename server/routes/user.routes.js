const Express     = require("express");
const UsersRouter = Express.Router();

/* Controllers */
const UsersController = require("../controllers/users.controller")

/* Users Routes */
UsersRouter.post("/signin", (req, res) => { new UsersController(req, res).signinUser(); });
// UsersRouter.post("/signout", (req, res) => { new UsersController(req, res).signoutUser(); });

module.exports = UsersRouter;