const Photo = require('../models/Photo')

const createNewPhoto = async (req,res)=>{
    const {title,imageUrl} = req.body
    if(!imageUrl)
        return res.status(404).json({message:'imageUrl is required'})
    const photo = await Photo.create({title,imageUrl})
    if(!photo)
        return res.status(400).json({message:'invalid photo'})
    res.status(201).json({message:`'${photo.title}' created successfully`})
}

const getAllPhotos = async (req,res)=>{
    const photos = await Photo.find().lean()
    if(!photos)
        return res.status(400).json('photos error')
    res.json(photos)
}

const getPhotoById = async (req,res)=>{
    const id = req.params.id
    const photo = await Photo.findById(id).lean()
    if(!photo)
        return res.status(400).json('photo not found')
    res.json(photo)
}

const updatePhoto = async (req,res)=>{
    const {id,title,imageUrl} = req.body
    if(!id)
        return res.status(404).json({message:"id is required"})
    const photo = await Photo.findById(id).exec()
    if(!photo)
        return res.status(400).json({message:'photo not found'})
    if(title) photo.title = title
    if(imageUrl) photo.imageUrl = imageUrl
    const updatedPhoto = await photo.save()
    res.json(`${updatedPhoto.title} updated`)
}

const deletePhoto = async (req,res)=>{
    const {id} = req.params
    const photo = await Photo.findById(id).exec()
    if(!photo)
        return res.status(400).json({message:'photo not found'})
    const result = await photo.deleteOne()
    res.json(`${photo.title} id:${id} deleted`)
}

module.exports = {createNewPhoto,getAllPhotos,getPhotoById,updatePhoto,deletePhoto}