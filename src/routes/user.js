const express = require("express")
const userService = require("../services/user")
const validateUser = require("../middlewares/authvalidation")

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
    res.send("Welcome to my route")
})

userRouter.post("/signup", validateUser, userService().signUserUp);
userRouter.post("/signin", validateUser, userService().signUserIn);
userRouter.get("/allusers", validateUser, userService().allUsers);

module.exports = userRouter