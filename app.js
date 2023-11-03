// Memanggil fungsi atau middleware di express js

const express = require('express');
const cors = require('cors');
const compression = require('compression');
const app = express();
const router = require('./routes');
const log = require('./middlewares/logger');
const path = require('path');

// Untuk mengkompress response

app.use(compression())

// Memakai Cors origin agar tidak bentrok dengan port lain

app.use(cors())

// Memakai logger

app.use(log);

// Agar middleware req.body dapat digunakan

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Menangani file static

app.use('/public', express.static(path.join(__dirname, 'uploads')));

// Memakai module router
app.use(router);

// Menangani eror 404

app.use((req, res, next) => {
    res.status(404);
    res.send({
        status: 'Failed',
        message: 'Resource ' + req.originalUrl + ' not found'
    })
});

app.listen(3000, () => console.log("Server runnig at http://localhost:3000"));