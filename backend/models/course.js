const mongoose = require('mongoose')

const Course = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    videos: Number,
    active: Boolean
})

module.exports = mongoose.model("courses", Course)