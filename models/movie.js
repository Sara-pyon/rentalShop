const { default: mongoose } = require("mongoose");
const genreSchema = require("../")

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100
    },
    genre: {
        type: genreSchema,
        
    }
})