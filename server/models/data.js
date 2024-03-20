const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DataScheme = new Schema({ 
    game: { type: String, required: true },
    character: { type: String, required: true },
    x: { type: Number, required: true },
    y: { type: Number, required: true },
})

module.exports = mongoose.model("Data", DataScheme);