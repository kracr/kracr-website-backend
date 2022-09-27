const express = require('express');
const mongoose = require('mongoose');
const publicationsRouter = express.Router();
const axios = require('axios');
const Publications = require('../modals/publications');


publicationsRouter.get("/", async (req, res) => {
    try {
        let publications = await Publications.find({}).sort({ Year: -1 });
        return res.status(200).send(publications);
    }
    catch {
        return res.status(401).send({ message: "some error" });
    }
});

publicationsRouter.delete('/:id',async(req,res)=>{
    try {
        let project = await Publications.deleteOne({ _id: req.params.id });
        return res.status(200).send({ message: "deleted" });
    }
    catch {
        return res.status(401).send({ message: "some error" });
    }
});

publicationsRouter.post('/add', async (req, res) => {
    try {
        let publications = await Publications.create(req.body);
        return res.status(200).send(publications);
    }
    catch {
        return res.status(401).send({ message: "some error" });
    }
});

publicationsRouter.post('/import', (req, res) => {
    try {
        req.body.map((i) => {
            axios.post('http://localhost:5000/publications/add', i.publications).catch(err => {
                return res.status(200).send({ me: "bleh" });
            });
        });
    }
    catch {
        return res.send("done");
    }
});

module.exports = publicationsRouter;