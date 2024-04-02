const { default: mongoose } = require("mongoose");
const Joi = require("joi");
const moment = require('moment');

const rentalSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            first_name: {
                type: String,
                required: true,
                minlength: 3,
                maxlength: 50
            },
            last_name: {
                type: String,
                required: true,
                minlength: 3,
                maxlength: 50
            },
            isGold: {
                type: Boolean,
                default: false
            }
    }), required: true},
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minlength: 5,
                maxlength: 255
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 255
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee:{
        type: Number,
        min: 0
    }});

rentalSchema.statics.lookup = function(customerId, movieId){
    return this.findOne({
        "customer._id": customerId,
        "movie._id": movieId
    });
};

rentalSchema.methods.return = function(){
    this.dateReturned = new Date();

    const returnDays = moment().diff(this.dateOut, "days");
    this.rentalFee = returnDays * this.movie.dailyRentalRate;
};

const Rental = mongoose.model('Rental', rentalSchema);

const validateRental = function(rental){
    const schema = Joi.object({
        customerId: Joi.string().required(),
        movieId: Joi.string().required()
    });

    return schema.validate(rental);
};

exports.Rental = Rental;
exports.validateRental = validateRental;