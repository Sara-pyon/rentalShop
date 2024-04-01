const { default: mongoose } = require("mongoose");
const { genreSchema } = require("../models/genre");
const Joi = require("joi");

const movieSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100
    },
    genre:{
        type: genreSchema,
        required: true
    },
    numberInStock:{
        type: Number,
        required: true,
        min: 0,
        max:200
    },
    dailyRentalRate:{
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
});

const Movie = mongoose.model('Movie',movieSchema);

function validateMovie(movie){
    const schema = Joi.object({
        title: Joi.string().min(5).max(100).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(0).max(200).required(),
        dailyRentalRate: Joi.number().min(0).max(255).required()
    });

    return schema.validate(movie);
};

exports.Movie = Movie;
exports.validateMovie = validateMovie;