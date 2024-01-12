const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userModel = require("../model/userSchema");

const controllers = {
    check: (req, res) => {
        res.send("ALL GOOD !")
    },

    signup: (req, res) => {
        const { name, email, password, phone } = req.body;
        if (!name || !email || !password || !phone) {
            res.send("Required Fields are missing !")
            return
        }

        userModel.findOne({ email })
            .then(async (user) => {
                if (user) {
                    res.json({
                        message: "Email Address Already In Use"
                    })
                } else {
                    // password hashing
                    let encryptedPassword = await bcrypt.hash(password, 10);
                    // sending data on db
                    let objToSend = {
                        name,
                        email,
                        password: encryptedPassword,
                        phone,
                    }
                    userModel.create(objToSend)
                        .then((response) => {
                            res.json({
                                status: true,
                                message: `${response.name}, You have registered`
                            })
                        })
                        .catch((err) => {
                            console.log(err)
                        })

                }
            })
            .catch((err) => {
                console.log(err)
            })
    },

    login: (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            res.send("Required Fields are missing !")
            return
        }

        userModel.findOne({ email })
            .then(async (user) => {
                if (!user) {
                    res.json({
                        message: "Email Not Found !"
                    })
                } else {
                    // sending data on db
                    let isPasswordMatch = await bcrypt.compare(password, user.password)
                    if (!isPasswordMatch) {
                        res.json({
                            message: "Incorrect email or password"
                        })
                    } else {
                        const tokenObj = {
                            ...user
                        }
                        const token = jwt.sign(tokenObj, 'isUserLogin');
                        // console.log('token:- ',token)
                        res.json({
                            message: `${user.name} login successfully !`,
                            token: token
                        })
                    }
                }
            })
            .catch((err) => {
                console.log(err)
            })
    },

    addToCart: (req, res) => {
        res.send("Eligible to create a post")
    }
}

module.exports = controllers