const express = require('express');
const mongoose = require('mongoose');
const blogRouter = express.Router();
const axios = require('axios');
const Blog = require('../modals/blog');

blogRouter.get("/", async (req, res) => {
    try {
        let blogs = await Blog.find({});
        return res.status(200).send(blogs);
    }
    catch {
        return res.status(401).send({ message: "some error" });
    }
});

blogRouter.get('/:id',async(req,res)=>{
    try {
        let blog = await Blog.findById(req.params.id);
        return res.status(200).send(blog);
    }
    catch {
        return res.status(401).send({ message: "some error" });
    }
});

blogRouter.post('/add',async(req,res)=>{
    try {
        let blog = await Blog.create(req.body);
        return res.status(200).send(blog);
    }
    catch {
        return res.status(401).send({ message: "some error" });
    }
});

blogRouter.delete('/:id',async(req,res)=>{
    try {
        let blog = await Blog.deleteOne({ _id: req.params.id });
        return res.status(200).send({ message: "deleted" });
    }
    catch {
        return res.status(401).send({ message: "some error" });
    }
});




module.exports = blogRouter;