const express = require('express')
const Score = require('../models/score')

const router = express.Router()

exports.createScore = async (req, res) => {
    const dataFromReact = req.body;
    console.log(dataFromReact);
    await Score.create(req.body);
    res.send('Data received successfully!');
}

exports.getScores = async (req, res) => {
    try {
        const scores = await Score.find({});
        res.json(scores);
      } catch (error) {
        console.error('Error finding scores:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}