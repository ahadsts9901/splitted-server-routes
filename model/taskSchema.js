const mongoose = require("mongoose");
const schema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    },
    created_on: {
        type: Date,
        default: Date.now()
    }
})

const tasksModel = mongoose.model("Tasks", schema);

module.exports = tasksModel;