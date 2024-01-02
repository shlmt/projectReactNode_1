const User = require('../models/User')

const createNewUser = async (req,res)=>{
    const {name,userName,email,address,phone} = req.body
    if(!userName)
        return res.status(404).json({message:'username is require'})
    const user = await User.create({name,userName,email,address,phone})
    if(!user)
        return res.status(400).json({message:'invalid user'})
    res.status(201).json({message:`${user.name} / ${userName} create successfully`})
}

const getAllUsers = async (req,res)=>{
    const users = await User.find().lean()
    if(!users)
        return res.status(400).json({message:'users not found'})
    res.json(users)
}

const getUserById = async (req,res)=>{
    const id = req.params.id
    const user = await User.findById(id).lean()
    if(!user)
        return res.status(400).json({message:'user not found'})
    res.json(user)
}

const updateUser = async (req,res)=>{
    const {id,name,userName,email,address,phone} = req.body
    if(!id || !userName) return res.status(400).json({message:'id & userName are required'})
    const user = await User.findById(id).exec()
    if(!user) return res.status(400).json({message:'user not found'})
    if(name) user.name = name
    user.userName = userName
    if(email) user.email = email
    if(address) user.address = address
    if(phone) user.phone = phone
    const updatedUser = await user.save()
    res.json(`${updatedUser.userName} updated`)
}

const deleteUser = async (req,res)=>{
    const {id} = req.params
    const user = await User.findById(id).exec()
    if(!user)
        return res.status(400).json({message:'user not found'})
    const result = await user.deleteOne()
    res.json(`${user.name} / ${user.userName} deleted`)
}

module.exports = {createNewUser,getAllUsers,getUserById,updateUser,deleteUser}