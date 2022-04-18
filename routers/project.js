const express = require('express');
const mongoose = require('mongoose');
const projectRouter = express.Router();
const axios = require('axios');
const Project = require('../modals/project');

projectRouter.get("/", async (req, res) => {
    try {
        let projects = await Project.find({});
        return res.status(200).send(projects);
    }
    catch {
        return res.status(401).send({ message: "some error" });
    }
});

projectRouter.get('/:id',async(req,res)=>{
    try {
        let project = await Project.findById(req.params.id);
        return res.status(200).send(project);
    }
    catch {
        return res.status(401).send({ message: "some error" });
    }
});

projectRouter.post('/add',async(req,res)=>{
    try {
        let project = await Project.create(req.body);
        return res.status(200).send(project);
    }
    catch {
        return res.status(401).send({ message: "some error" });
    }
});

projectRouter.delete('/:id',async(req,res)=>{
    try {
        let project = await Project.deleteOne({ _id: req.params.id });
        return res.status(200).send({ message: "deleted" });
    }
    catch {
        return res.status(401).send({ message: "some error" });
    }
});

projectRouter.post('/import',(req,res)=>{
    console.log(req.body);
    req.body.map((i)=>{
        axios.post('http://localhost:5000/project/add',{
        "title" : i.project.Title,
        "authors" : i.project.Authors,
        "description" : i.project.Description,
        "githubUrl" : i.project.GithubLink,
        "publicationUrl" : i.project.PublicationURL,
        "category" : i.project.Category,
        "year" : i.project.Year?new Date(i.project.Year):null
    });
});
    return res.send("done");
});



module.exports = projectRouter;