const router = require('express').Router()
const { item, image } = require("../../models")
const multer = require('multer')

const storage = multer.memoryStorage()
const upload = multer({
    storage: storage,
    limits: { files: 3 }
})