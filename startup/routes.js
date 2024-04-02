const express =require('express');
const genre = require('../Route/genre');
const movie = require('../Route/movie');
const user = require('../Route/user');
const customer = require('../Route/customer');
const rental = require('../Route/rental');
const returns = require('../Route/return');
const auth = require('../Route/auth');

module.exports = function(app){
    
    app.use(express.json());
    app.use('/api/genres', genre);
    app.use('/api/movies', movie);
    app.use('/api/users', user);
    app.use('/api/customers', customer);
    app.use('/api/rentals', rental);
    app.use('/api/auth', auth);
    app.use('/api/returns', returns);
}
