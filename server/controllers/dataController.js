const express = require('express')
const Data = require('../models/data')

const router = express.Router()

exports.createData = async (req, res) => {
    try {
        const newData = await Data.create(req.body);
        res.status(201).json(newData);
      } catch (error) {
        console.error('Error saving data to MongoDB:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

exports.getDataBeach = async (req, res) => {
    try {
        const data = await Data.find({ game: 'beach' });
        res.json(data);
      } catch (error) {
        console.error('Error finding data:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

exports.getDataFactory = async (req, res) => {
  try {
      const data = await Data.find({ game: 'factory' });
      res.json(data);
    } catch (error) {
      console.error('Error finding data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}

exports.getDataSkislope = async (req, res) => {
  try {
      const data = await Data.find({ game: 'skislope' });
      res.json(data);
    } catch (error) {
      console.error('Error finding data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}