const router = require('express').Router()
const bcrypt = require("bcrypt")
const { User } = require('../../models')

//Responsible for creating account
router.post('/signup', async (req, res) => {
    //logic for creating new user
    try {
        //get variables from req body
        const { username, password, phone_email, address } = req.body

        //check if user exists by searching for username
        const user = await User.findOne({ where: { username } })
        //if username exists, render message below
        if (user) {
            res.status(400).json({ message: 'Username already exists' })
        }

        //hash the password
        const hashPassword = await bcrypt.hash(password, 10)

        //create new user
        const newUser = User.create({
            username,
            password: hashPassword,
            phone_email,
            address
        })
        //redirect to homepage once signup is successful
        res.redirect('/')
    } catch (error) {
        console.error(error)
        res.status(400).json(error)
    }
})

//Responsible for user login
router.post('/login', async (req, res) => {
    //logic for user login 
    try {
        //get username, password from req body
        const { username, password } = req.body

        const user = User.findAll(user => user.username === username)

        if (!user) {
            return res.status(404).json({ message: 'invalid username or password' })
        }

        const checkPassword = await bcrypt.compare(password, user.password)
        if (!checkPassword) {
            return res.status(404).json({ message: 'invalid username or password' })
        }
    } catch (error) {
        console.error(error)
        res.status(400).json(error)
    }
})