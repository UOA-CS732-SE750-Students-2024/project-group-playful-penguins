const express = require('express');
const connectDB = require("./config/db.js");
const cors = require('cors');

require('dotenv').config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.listen(
    PORT,
    console.log(
        `Server running in localhost mode on port ${PORT}..`
    )
);