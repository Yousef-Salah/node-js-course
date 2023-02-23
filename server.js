const express = require('express');
const app = express();
const axios = require('axios');
const mongoose = require('mongoose');
require('dotenv').config();

const pokimonRoutes = require('./routes/pokimonRoutes');

app.set('view engine', 'ejs');


app.use('/', pokimonRoutes);

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DBURI)
    .then(() => {
        app.listen(3000);
        console.log('connected');
    })
    .catch((err) => console.log(err));

