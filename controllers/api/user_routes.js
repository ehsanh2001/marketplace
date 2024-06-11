const router = require('express').Router()
const bcrypt = require("bcrypt")
const { User } = require('../../models')

//Responsible for creating account
router.post('/signup', async (req, res) => {
    //logic for creating new user
})

//Responsible for user login
router.post('/login', async (req, res) => {
    //logic for user login 
})