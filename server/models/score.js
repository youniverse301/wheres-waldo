const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ScoreSchema = new Schema({ 
    game: { type: String, required: true },
    name: { type: String, required: true },
    time: { type: String, required: true },
})

module.exports = mongoose.model("Score", ScoreSchema);