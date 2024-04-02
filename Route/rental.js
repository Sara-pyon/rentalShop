const validator = require('../middleware/validator');
const { Rental, validateRental } = require('../models/rental');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movie');
const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    const rentals = await Rental.find().sort();
    return res.send(rentals);
});

router.post('/', validator(validateRental), async(req, res) => {
    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(404).send('Invalid customer');

    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(404).send('Invalid movie');

    if(movie.numberInStock === 0) return req.status(400).send("Movie is not in stock.");

    const session = await Rental.startSession();
    if(!session)
        return res.status(500).send("Internal Server Error: Unable to start a database session.");

    await session.startTransaction();

    try{
        let rental = new Rental({
            customer: {
                _id: customer._id,
                first_name: customer.first_name,
                last_name: customer.last_name,
                phone: customer.phone
            },
            movie: {
                _id: movie._id,
                title: movie.title,
                dailyRentalRate: movie.dailyRentalRate
            }
        });
        rental = await rental.save({session});

        movie.numberInStock--;
        await movie.save({session});

        res.send(rental);
        
        await session.commitTransaction();
    }catch(e){
        await session.abortTransaction();
        console.log("The transaction was aborted due to an unexpected error : " + e);
    }finally{
        session.endSession();
    }
});

module.exports = router;