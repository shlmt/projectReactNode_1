const express = require("express")
const router = express.Router()
const {createNewPost,getAllPosts,getPostById,updatePost,deletePost} = require("../controllers/postControler")


router.post("/", createNewPost)

router.get("/",getAllPosts)
router.get("/:id",getPostById)

router.put("/",updatePost)

router.delete("/:id",deletePost)

module.exports = router