const express = require("express")
const connectToDB = require("./src/config/index")
const userRouter = require("./src/routes/user")
// require("dotenv").config()

const app = express();
app.use(express.json())

connectToDB();

app.use("/api/v1/users", userRouter)

const port = process.env.port || 8080
app.listen(port, console.log("App connected to port:", port))




