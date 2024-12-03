const jwt = require("jsonwebtoken")
const User = require("../models/user")

const validateUser = (req, res, next) => {
    console.log(req.headers.authorization);
    if (req.headers.authorization) {
        let token = req.headers.authorization.split(" ")[1]
        let userEmail = jwt.verify(token, "unhash")
        if (userEmail) {
            let user = User.findOne({
                email: userEmail.email
            })
            if (user) {
                console.log("Welcome to my route");
                res.body = user;
                next();
            } else {
                res.send("You cannot access this route")
            }
        } else {
            res.send("You cannot access this route due to auth")
        }
    } else {
        res.send("You cannot access this route also due to auth")
    }
    // next();
}

module.exports = validateUser;