const express = require('express');
const auth = require('../middleware/auth');
const { Rental } = require('../models/rental');
const { Movie } = require('../models/movie');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const validator = require('../middleware/validator');
const router = express.Router();

router.post('/', [auth, validator(validateReturn)], async(req, res) => {
    const rental = await Rental.lookup(req.body.customerId, req.body.movieId);

    if(!rental) return res.status(404).send('Rental not found');
    if(rental.dateReturned) return res.status(400).send('Return already prossesed.');

    const session = await Rental.startSession();
    if(!session)
        return res.status(500).send("Internal Server Error: Unable to start a database session.");

    await session.startTransaction();

    try{
        rental.return();
        await rental.save({session});
    
        await Movie.updateOne({_id: req.body.movieId},{
            $inc: {numberInStock: 1}
        },{session});

        return res.status(200).send(rental);
    }catch(e){
        await session.abortTransaction();
        console.log("The transaction was aborted due to an unexpected error : " + e);
    }finally{
        session.endSession();
    }
});

function validateReturn(req){
    const schema = Joi.object({
        customerId: Joi.objectId(),
        movieId: Joi.objectId()
    });

    return schema.validate(req);
}

module.exports = router