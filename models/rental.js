const { default: mongoose } = require("mongoose");

const rentalSchema = mongoose.Schema({
    user: {
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
            },
            email: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 255,
            unique: true
        }
    }),
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
        })
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
    }}
    });

const Rental = mongoose.model('Rental', rentalSchema);

const validateRental = function(customer){
    const schema = {
        
    }
}