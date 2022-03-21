const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const newsSchema = new Schema({
    Date: {
        type: Date
    },
    Title: {
        type: String
    }
}, {
    timestamps: true
});

var News = mongoose.model('News', newsSchema);
module.exports = News;