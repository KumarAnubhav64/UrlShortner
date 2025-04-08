const { mongoose, Schema } = require('mongoose')


const urlSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    click: {
        type: Number
    },
});

const Url =  mongoose.model("url",urlSchema);

module.exports = {Url}