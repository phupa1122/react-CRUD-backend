const {readdirSync} = require('fs')
const morgan = require('morgan')
const express = require('express');
const cors = require('cors');
const app = express();
const bodyPaser = require('body-parser');
const database = require('./config')
const port = process.env.PORT || 3000;
require('dotenv').config();

database();

app.use(morgan('dev'));
app.use(bodyPaser.json({ extended: true }));
app.use(morgan())
app.use(cors(
    {origin: 'http://localhost:5173'}
));

readdirSync('./routes')
    .map((r) => {
        const route = require('./routes/' + r);
        app.use('/api', route);
    });

app.listen(port, (error) => {
    if (error) {
        console.error(`Error starting server: ${error}`);
    } else {
        console.log(`Server is running on port ${port}`);
    }
});


module.exports = app;