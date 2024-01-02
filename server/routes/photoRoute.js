const express = require('express')
const router = express.Router()
const {createNewPhoto,getAllPhotos,getPhotoById,updatePhoto,deletePhoto} = require('../controllers/photoController')

router.post("/",createNewPhoto)

router.get("/",getAllPhotos)
router.get("/:id",getPhotoById)

router.put("/",updatePhoto)

router.delete("/:id",deletePhoto)

module.exports = router