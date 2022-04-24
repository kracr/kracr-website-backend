const express = require('express');
const mongoose = require('mongoose');
const imageRouter = express.Router();
const axios = require('axios');
const multer = require("multer");
const path = require("path");
var crypto = require("crypto");
require('dotenv/config');
var fs = require('fs');
var request = require('request');
const Team = require('../modals/team');

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};


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
    res.send({name:req.file.filename.substring(0,req.file.filename.length-4)});
});

imageRouter.get('/:id',(req,res)=>{
    console.log("check");
    res.sendFile(`/${req.params.id}.jpg`,{root:process.env.imageDir});
});

imageRouter.get('/test/test',(req,res)=>{

    Team.find({}).then((team)=>{
        console.log(team);
        team.forEach((i,index)=>{
            if(i.ImageURL){
            console.log("url",i.ImageURL);
            download(i.ImageURL, `${i.Name}.jpg`, async function(){
                var bodyFormData = new URLSearchParams();
                console.log("download done");
                bodyFormData.append('image',fs.createReadStream(`A:/Semester 6/kracr-website-backend/${i.Name}.jpg`)); 
                axios({
                    method: "post",
                    url: "http://localhost:5000/image/upload",
                    data: bodyFormData,
                   
                  }).then(async(data)=>{
                      console.log("upload done");
                        await Team.findByIdAndUpdate(i._id,{$set:{ImageURL:data.name}});
                  });
            });
        }
        else{
            console.log("no image",i);
        }
        });

        // download('https://www.google.com/images/srpr/logo3w.png', 'check.png', function(){

        // });
    })
    
    // res.send({done:"done"});
})

module.exports = imageRouter;