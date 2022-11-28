const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
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
    htmlEmbedLink : {
        type: String
    }
},{
    timestamps: true
});

var Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;