const express = require('express');
const PORT = 4000;
const app = express();

const cors =require('cors');
const mongoose = require ('mongoose');
const {MONGODB_URL} = require ('./config')

global.__basedir =__dirname;

 mongoose.connect(MONGODB_URL);

 mongoose.connection.on('connected', ()=>{
    console.log("db connected ");
 })
 mongoose.connection.on('error', (error)=>{
    console.log("some eror while connection ");
 })

 app.use (cors());
 app.use(express.json());

 require('./models/user-model');
 require('./models/post-model');
 app.use(require('./routes/user-route'));
 app.use(require('./routes/post-route'));
 app.use(require('./routes/file-route'));

app.listen(PORT, () => {
    console.log("Server started");
});

