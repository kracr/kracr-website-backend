const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    authors: 
        {
            type: String
        }
    ,
    category: {
        type: String
    },
    images: [{
        type: String
    }],
    year : {
        type: Date
    },
    githubUrl : {
        type: String
    },
    publicationUrl : {
        type: String
    }
},{
    timestamps: true
});

var Projects = mongoose.model('Projects', projectSchema);
module.exports = Projects;