const router = require('express').Router()
const { item, image } = require("../../models")
const multer = require('multer')

const storage = multer.memoryStorage()
const upload = multer({
    storage: storage,
    limits: { files: 3 }
})

//add items
router.post('/new/items', async (req, res) => {
    //logic for adding items
})

//update items
router.put('/new/items/:id', async (req, res) => {
    //logic for updating items
})

//delete items
router.delete('/new/items/:id', (req, res) => {
    //logic for deleting items
})