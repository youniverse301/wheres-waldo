const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./routes/router')
require("dotenv").config()
const mongoose = require("mongoose")
const dataRouter = require("./routes/dataRouter")


const mongoDb = process.env.MONGODB_URL;
mongoose.connect(mongoDb, { useNewUrlParser: true, useUnifiedTopology: true }); // Pass options to avoid deprecation warnings
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:')); // Log MongoDB connection error
db.once('open', function() {
    console.log('Connected to MongoDB successfully.'); // Log success message once connected
});



const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use('/', router)
app.use('/data', dataRouter)

const port = 4000
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})