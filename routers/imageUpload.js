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
var FormData = require('form-data');
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
    // console.log(req);
    console.log("check");
    res.send({name:req.file.filename.substring(0,req.file.filename.length-4)});
});

imageRouter.get('/:id',(req,res)=>{
    console.log("check");
    res.sendFile(`/${req.params.id}.jpg`,{root:process.env.imageDir});
});

// imageRouter.get('/test/test',(req,res)=>{

//     Team.find({}).then((team)=>{
//         console.log(team);
//         team.forEach((i,index)=>{
//             if(i.ImageURL){
//             // console.log("url",i.ImageURL);
            
//             var bodyFormData = new FormData();
//             console.log("download done");
//             // console.log(fs.createReadStream(`A:/Semester 6/kracr-website-backend/${i.Name}.jpg`));
//             bodyFormData.append('image',fs.createReadStream(`A:/Semester 6/kracr-website-backend/${i.Name}.jpg`)); 
//             // console.log(bodyFormData);
//             axios.post('http://localhost:5000/image/upload', bodyFormData,{headers: {
//                 ...bodyFormData.getHeaders(),
//               }}).then(async(res)=>{
//                     console.log("upload done");
//                     console.log(res.data);
//                     Team.findByIdAndUpdate(i._id,{$set:{ImageURL:res.data.name}},{new:true}).then((okay)=>{
//                         console.log("updated");
//                         console.log(okay);
//                     });
//                 });
            
//         }
//         else{
//             console.log("no image",i);
//         }
//         });

//         // download('https://www.google.com/images/srpr/logo3w.png', 'check.png', function(){

//         // });
//     })
    
//     // res.send({done:"done"});
// })

module.exports = imageRouter;