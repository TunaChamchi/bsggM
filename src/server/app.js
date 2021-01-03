const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const port = 3001;
const connect = require('./schemas');
const rank = require('./routes/Rank');
const users = require('./routes/Users');
const character = require('./routes/Character');

const app = express();

connect();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/rank', rank);
app.use('/api/user', users);
app.use('/api/character', character);

app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
})