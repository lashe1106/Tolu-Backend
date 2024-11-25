const User = require("../models/user")
const bcrypt = require("bcrypt")

const userService = () => {
    const signUserUp = async (req, res) => {
        try {
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
                    res.json({
                        message: "User is logged in",
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

    return{signUserUp, signUserIn}
}

module.exports = userService