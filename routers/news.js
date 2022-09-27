const express = require('express');
const mongoose = require('mongoose');
const newsRouter = express.Router();
const axios = require('axios');
const News = require('../modals/news');

newsRouter.get('/', async (req, res) => {
    try {
        let news = await News.find({}).sort({ Date: -1 });
        return res.status(200).send(news);
    }
    catch {
        return res.status(401).send({ message: "some error" });
    }
});

newsRouter.post('/add', async (req, res) => {
    News.create({
        Date: new Date(req.body.Date),
        Title: req.body.Title
    }).then(news => {
        console.log(news);
        return res.status(200).send(news);
    }).catch(err => {
        console.log(err);
        return res.status(401).send({ message: "some error" });
    })
});

newsRouter.post('/import', (req, res) => {
    try {
        req.body.map((i) => {
            axios.post('http://localhost:5000/news/add', i.news).catch(err => {
                return res.status(200).send({ me: "bleh" });
            });
        });
    }
    catch {
        return res.send("done");
    }
});

projectRouter.delete('/:id',async(req,res)=>{
    try {
        let project = await News.deleteOne({ _id: req.params.id });
        return res.status(200).send({ message: "deleted" });
    }
    catch {
        return res.status(401).send({ message: "some error" });
    }
});


module.exports = newsRouter;