const express = require('express')
const router = express.Router()
const {createNewUser,getAllUsers,getUserById,updateUser,deleteUser} = require('../controllers/userController')

router.post("/",createNewUser)

router.get("/",getAllUsers)
router.get("/:id",getUserById)

router.put("/",updateUser)

router.delete("/:id",deleteUser)

module.exports = router