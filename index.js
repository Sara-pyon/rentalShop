const express =require('express');
const genre = require('./Route/genre');
const movie = require('./Route/movie');
const user = require('./Route/user');
const customer = require('./Route/customer');
const rental = require('./Route/rental');
const returns = require('./Route/return');
const auth = require('./Route/auth');
const { default: mongoose } = require('mongoose');
const app = express();

//Middleware
app.use(express.json());
app.use('/api/genres', genre);
app.use('/api/movies', movie);
app.use('/api/users', user);
app.use('/api/customers', customer);
app.use('/api/rentals', rental);
app.use('/api/auth', auth);
app.use('/api/returns', returns);

//connect to database
const db = 'mongodb+srv://radwimpssara:1234@cluster0.5ulijyy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(db)
    .then(() => console.log(`Connected to ${db}... `))
    .catch((er) => console.error('Failed to connect',er));

let port;

port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening port ${port}`));