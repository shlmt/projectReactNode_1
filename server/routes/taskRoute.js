const express = require("express")
const router = express.Router()
const {createNewTask,getAllTasks,getTaskById,updateTask,updateTaskComplete,deleteTask} = require("../controllers/taskControler")

router.post("/", createNewTask)

router.get("/",getAllTasks)
router.get("/:id",getTaskById)

router.put("/",updateTask)
router.put("/:id",updateTaskComplete)

router.delete("/:id",deleteTask)

module.exports = router