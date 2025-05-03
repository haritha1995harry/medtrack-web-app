var express = require("express")
var app = express()
const mongoose = require('mongoose');
app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/medtrackDB');

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB!');
});

const userRoutes = require('./routes/userRoutes'); 
app.use('/', userRoutes);

var port = process.env.port || 3000;
app.listen(port, () => {
    console.log("App listening to: " + port)
})