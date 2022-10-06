const express = require('express');
const mongoose = require('mongoose');
const teamRouter = express.Router();
const axios = require('axios');
const Team = require('../modals/team');

teamRouter.get("/", async (req, res) => {
    try {
        let team = await Team.find({}).sort({Name:1});
        return res.status(200).send(team);
    }
    catch {
        return res.status(401).send({ message: "some error" });
    }
});


teamRouter.post('/add', async (req, res) => {
    try {
        let team = await Team.create(req.body);
        return res.status(200).send(team);
    }
    catch {
        return res.status(401).send({ message: "some error" });
    }
});

teamRouter.post('/import', (req, res) => {
    try {
        req.body.map((i) => {
            axios.post('http://localhost:5000/team/add', i.team).catch(err => {
                return res.status(200).send({ me: "bleh" });
            });
        });
    }
    catch {
        return res.send("done");
    }
});

teamRouter.post("/update/:id",async(req,res)=>{
    try {
        let team = await Team.findByIdAndUpdate(req.params.id,{$set:{Position:req.body.Position}});
        return res.status(200).send(team);
    }
    catch {
        return res.status(401).send({ message: "some error" });
    }
})
teamRouter.delete('/:id',async(req,res)=>{
    try {
        let project = await Team.deleteOne({ _id: req.params.id });
        return res.status(200).send({ message: "deleted" });
    }
    catch {
        return res.status(401).send({ message: "some error" });
    }
});

module.exports = teamRouter;