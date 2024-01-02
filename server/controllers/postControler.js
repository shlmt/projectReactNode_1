const Post = require("../models/Post")

const createNewPost = async (req,res)=>{
    const {title,body} = req.body
    if(!title)
        return res.status(404).json({message:'title is required'})
    const post = await Post.create({title,body})
    if(!Post)
        return res.status(400).json({message:'invalid Post'})
    res.status(201).json({message:`${post.title} created successfully`})
}

const getAllPosts = async (req,res)=>{
    const posts = await Post.find().lean()
    if(!posts)
    return res.status(400).json('posts error')
    res.json(posts)
}

const getPostById = async (req,res)=>{
    const id = req.params.id
    const post = await Post.findById(id).lean()
    if(!post)
        return res.status(400).json({message:'post not found'})
    res.json(post)
}

const updatePost = async (req,res)=>{
    const {id,title,body} = req.body
    if(!id || !title) return res.status(400).json({message:'title & id are required'})
    const post = await Post.findById(id).exec()
    if(!post) return res.status(400).json({message:'Post not found'})
    post.title = title
    if(body) post.body = body
    const updatedPost = await post.save()
    res.json(`${updatedPost.title} updated`)
}


const deletePost = async(req,res)=>{
    const {id} = req.params
    const post = await Post.findById(id).exec()
    if(!post)
        return res.status(400).json({message:'Post not found'})
    const result = await post.deleteOne()
    res.json(`${post.title} id:${post.id} deleted`)
}

module.exports = {createNewPost,getAllPosts,getPostById,updatePost,deletePost}