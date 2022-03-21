const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    Name: {
        type: String
    },
    Mail: {
        type: String
    },
    Position: {
        type: String
    },
    Interests: {
        type: String
    },
    ImageURL: {
        type: String
    },
    Designation: {
        type: String
    },
    githubLink: {
        type: String
    },
    linkedinLink: {
        type: String
    },
    twitterLink: {
        type: String
    },
    webpageLink: {
        type: String
    }
}, {
    timestamps: true
});


var Team = mongoose.model('Team', teamSchema);
module.exports = Team;