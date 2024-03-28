const genre = require('./Route/genre');
const express =require('express');
const { default: mongoose } = require('mongoose');
const app = express();

//Middleware
app.use(express.json());
app.use('/api/genres', genre);

//connect to database
const db = 'mongodb+srv://radwimpssara:1234@cluster0.5ulijyy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(db)
    .then(() => console.log(`Connected to ${db}... `))
    .catch((er) => console.error('Failed to connect',er) );


let port;

port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening port ${port}`));