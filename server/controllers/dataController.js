const express = require('express')
const Data = require('../models/data')

const router = express.Router()

exports.createData = async (req, res) => {
    try {
        const newData = await Data.create(req.body);
        console.log('Data saved to MongoDB:', newData);
        res.status(201).json(newData);
      } catch (error) {
        console.error('Error saving data to MongoDB:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

exports.getData = async (req, res) => {
    try {
        const data = await Data.find({});
        res.json(data);
        console.log('Data from MongoDB:', data);
      } catch (error) {
        console.error('Error finding data:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}