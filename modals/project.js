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
    sections: [{
        subHeading : String,
        description: String,
        images: [{
            type: String
        }
        ]
    }],
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
    },
    htmlEmbedLink : {
        type: String
    },
    links:[
        {   
            linkType: String,
            link: String
        }
    ]
},{
    timestamps: true
});

var Projects = mongoose.model('Projects', projectSchema);
module.exports = Projects;