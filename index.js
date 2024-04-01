const genre = require('./Route/genre');
const movie = require('./Route/movie');
const user = require('./Route/user');
const express =require('express');
const { default: mongoose } = require('mongoose');
const app = express();

//Middleware
app.use(express.json());
app.use('/api/genres', genre);
app.use('/api/movies', movie);
app.use('/api/user', user);

//connect to database
const db = 'mongodb+srv://radwimpssara:1234@cluster0.5ulijyy.mongodbb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(db)
    .then(() => console.log(`Connected to ${db}... `))
    .catch((er) => console.error('Failed to connect',er) );


let port;

port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening port ${port}`));