const express = require('express')
const Score = require('../models/score')

const router = express.Router()

exports.getLowestScores = async (req, res) => {
    try {
        const lowestTimes = await Score.aggregate([
            {
                $addFields: {
                    totalTime: {
                        $sum: [
                            { $multiply: [{ $toInt: { $substr: ["$time", 0, 2] } }, 3600000] },
                            { $multiply: [{ $toInt: { $substr: ["$time", 3, 2] } }, 60000] },
                            { $multiply: [{ $toInt: { $substr: ["$time", 6, 2] } }, 1000] }
                        ]
                    }
                }
            },
            { $sort: { totalTime: 1 } },
            { $limit: 5 }
        ]);
        res.json(lowestTimes);
    } catch (err) {
        console.error('Error fetching lowest time:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};