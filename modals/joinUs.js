const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const joinUsSchema = new Schema({
    role: String,
    description: String,
    dueDate: Date,
    jdPdf: String,
    applyLink: String,
},{
    timestamps:true
});

var joinUs = mongoose.model('joinUs', joinUsSchema);
module.exports = joinUs;