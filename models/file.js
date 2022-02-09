const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
    folderName:{
        type: String,
        required: true
    },
    contents:{
        type: Array
    }
})

module.exports = mongoose.model("folderStructure", folderSchema);