const router = require('express').Router()
const { item, image } = require("../../models")
const multer = require('multer')

const storage = multer.memoryStorage()
const upload = multer({
    storage: storage,
    limits: { files: 3 }
})

//add items
router.post('/new/items', upload.array('images', 3), async (req, res) => {
    try {
        const newItem = await item.create(req.body)

        if (req.files) {
            for (const newFile of req.files) {
                await image.create({
                    item_id: newItem.id,
                    image: newFile.buffer
                })
            }
        }

        res.status(200).json(newItem)
    } catch (error) {
        console.error(error)
        res.status(400).json(error)
    }
})

//update items
router.put('/new/items/:id', async (req, res) => {
    //logic for updating items
})

//delete items
router.delete('/new/items/:id', (req, res) => {
    //logic for deleting items
})