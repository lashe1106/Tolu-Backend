const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userService = () => {
    const signUserUp = async (req, res) => {
        try {
            let userData = await User.findOne({
                email: req.body.email,
            })

            if (userData) {
                res.send("Email already exists")
            } else {
                let newUser = new User();
                newUser.name = req.body.name;
                newUser.email = req.body.email;
                newUser.dateofbirth = req.body.dateofbirth;
                newUser.address = req.body.address;
                newUser.bio = req.body.bio;

                const saltRound = 10
                const hash = await bcrypt.hash(req.body.password, saltRound)

                newUser.password = hash;

                newUser.save().then(() => {
                    res.send("User saved successfully")
                })
            }
            
        } catch (error) {
            res.send("There is an error saving user data" + error)
        }
    }

    const signUserIn = async (req, res) => {
        try{
            const userData = await User.findOne({
                email: req.body.email,
            })
            
            if (userData) {
                const isPasswordCorrect = bcrypt.compareSync(req.body.password, userData.password)

                if (isPasswordCorrect) {
                    let token = await jwt.sign({ email: req.body.email}, "unhash")
                    console.log(token);
                    
                    res.json({
                        message: "User is logged in", token,
                        data: userData
                    })
                } else {
                    res.send("Incorrect Password")
                }

            } else {
                res.send("User has not signed up")
            }
        } catch (err) {
            res.send("Password needed to log in")
        }
    }

    const allUsers = (req, res) => {
        User.find()
            .then((data) => {
                console.log(data);
                
                res.json({
                    message: "Users data gotten successfully",
                    data
                })
            })
            .catch(error => {
                res.json({
                    message: "Error getting users data",
                })
            })

        // try {
        //     const getAllUsers = User.find()
        //     if (condition) {
                
        //     } else {
                
        //     }
        //     res.json({
        //         message: "Users data gotten successfully",
        //         data: getAllUsers
        //     })
        // } catch (error) {
        //     res.json({
        //         message: "Error getting users data",
        //     })
        // }
    }

    return{signUserUp, signUserIn, allUsers}
}

module.exports = userService