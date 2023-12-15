const express = require('express')
const { connectToMongoDB } = require('./config/database')
const router = require('./routes')
require('dotenv').config();

const app = express()
const port = 7869
connectToMongoDB()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
