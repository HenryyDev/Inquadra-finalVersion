const express = require('express');
const db = require('./db');
const app = express();
app.use(express.json());
const port = 3000;
const cors = require('cors');

app.use(cors({
    origin: "*"
}));

