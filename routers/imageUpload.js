const express = require('express');
const mongoose = require('mongoose');
const imageRouter = express.Router();
const axios = require('axios');
const multer = require("multer");
const path = require("path");
var crypto = require("crypto");
require('dotenv/config');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.env.imageDir)
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+'.jpg')
  }
});

const upload = multer({
   storage: storage
});

imageRouter.post('/upload',upload.single('image'),(req,res)=>{
    console.log(req);
    res.send({test:req.file.filename.substring(0,req.file.filename.length-4)});
});

imageRouter.get('/:id',(req,res)=>{
    console.log("check");
    res.sendFile(`/${req.params.id}.jpg`,{root:process.env.imageDir});
});


module.exports = imageRouter;