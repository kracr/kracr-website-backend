const express = require('express');
const mongoose = require('mongoose');
const joinUsRouter = express.Router();
const axios = require('axios');
const joinUs = require('../modals/joinUs');

joinUsRouter.get('/', async (req, res) => {
    try {
        let join = await joinUs.find({dueDate:{$gte:new Date()}}).sort({ createdAt: -1 });
        return res.status(200).send(join);
    }
    catch {
        return res.status(401).send({ message: "some error" });
    }
});

joinUsRouter.post('/add', async (req, res) => {
    req.body.dueDate = new Date(req.body.dueDate);
    joinUs.create(
        req.body
    ).then(data => {
        console.log(data);
        return res.status(200).send(data);
    }).catch(err => {
        console.log(err);
        return res.status(401).send({ message: "some error" });
    })
});

joinUsRouter.delete('/:id',async(req,res)=>{
    try {
        let project = await joinUs.deleteOne({ _id: req.params.id });
        return res.status(200).send({ message: "deleted" });
    }
    catch {
        return res.status(401).send({ message: "some error" });
    }
});
module.exports = joinUsRouter;