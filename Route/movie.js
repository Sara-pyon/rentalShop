const express = require('express');
const { Movie, validateMovie } = require('../models/movie');
const { Genre } = require('../models/genre');
const validator = require('../middleware/validator');
const validateObjectId = require('../middleware/validateObjectId');
const router = express.Router();

router.get('/', async(req, res) => {
    const movies = await Movie.find().sort('title');
    res.send(movies);
});

router.post('/', validator(validateMovie), async(req, res) => {
    const genre = await Genre.findById(req.body.genreId);
    if(!genre) res.status(404).send('The genre with the given ID was not found');
    
    let movie = await Movie.findOne({title: req.body.title});
    if(movie) return res.status(400).send('The movie is already registered');

    movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
    await movie.save();
    res.send(movie);
});

router.put('/:id', [validateObjectId,validator(validateMovie)], async(req,res) => {
    const genre = await Genre.findById(req.body.genreId);
    if(!genre) res.status(404).send('The genre with the given ID was not found');

    const movie = await Movie.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    }, {new: true});
    
    if(!movie) res.status(404).send('The movie with the given ID was not found');

    res.send(movie);
});

router.delete('/:id', validateObjectId ,async(req, res) => {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    if(!movie) res.status(404).send('The movie with the given ID was not found');

    res.send(movie);
});

router.get('/:id', validateObjectId ,async(req, res) => {
    const movie = await Movie.findById(req.params.id);

    if(!movie) res.status(404).send('The movie with the given ID was not found');

    res.send(movie);
});

module.exports = router;