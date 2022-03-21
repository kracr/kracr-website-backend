const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const publicationSchema = new Schema({
    Authors: {
        type: String
    },
    Category: {
        type: String
    },
    Description: {
        type: String
    },
    PublicationURL: {
        type: String
    },
    Title: {
        type: String
    },
    Year: {
        type: String
    }
}, {
    timestamps: true
});

var Publications = mongoose.model('Publications', publicationSchema);
module.exports = Publications;
