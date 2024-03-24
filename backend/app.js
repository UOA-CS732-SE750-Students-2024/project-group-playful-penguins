const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 8000;

app.listen(
    PORT,
    console.log(
        `Server running in localhost mode on port ${PORT}..`
    )
);