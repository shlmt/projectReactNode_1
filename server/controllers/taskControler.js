const Task = require("../models/Task")

const createNewTask = async (req,res)=>{
    const {name,tags} = req.body
    if(!name)
        return res.status(404).json({message:'name is required'})
    const task = await Task.create({name,tags})
    if(!task)
        return res.status(400).json({message:'invalid task'})
    res.status(201).json({message:`${task.name} created successfully`})
}

const getAllTasks = async (req,res)=>{
    const tasks = await Task.find().lean()
    if(!tasks)
    return res.status(400).json('tasks error')
    res.json(tasks)
}

const getTaskById = async (req,res)=>{
    const id = req.params.id
    const task = await Task.findById(id).lean()
    if(!task)
        return res.status(400).json({message:'task not found'})
    res.json(task)
}

const updateTask = async (req,res)=>{
    const {id,name,tags} = req.body
    if(!id || !name) return res.status(400).json({message:'name & id are required'})
    const task = await Task.findById(id).exec()
    if(!task) return res.status(400).json({message:'task not found'})
    task.name = name
    if(tags) task.tags = tags
    const updatedTask = await task.save()
    res.json(`${updatedTask.name} updated`)
}

const updateTaskComplete = async(req,res)=>{
    const {id} = req.params
    const task = await Task.findById(id).exec()
    if(!task)
        return res.status(400).json({message:'task not found'})
    task.complete = !task.complete
    const updatedTask = await task.save()   
    res.json(`${updatedTask.name} updated`)
}

const deleteTask = async(req,res)=>{
    const {id} = req.params
    const task = await Task.findById(id).exec()
    if(!task)
        return res.status(400).json({message:'task not found'})
    const result = await task.deleteOne()
    res.json(`${task.name} id:${task.id} deleted`)
}

module.exports = {createNewTask,getAllTasks,getTaskById,updateTask,updateTaskComplete,deleteTask}