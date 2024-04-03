const express = require('express');
const { Genre, validateGenre } = require('../models/genre');
const validator = require('../middleware/validator');
const validateObjectId = require('../middleware/validateObjectId');
const router = express.Router();

router.get('/',async(req, res) => {
    throw new Error('Could nnot get genres');
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.post('/', validator(validateGenre) ,async(req,res) => {
    const genre = new Genre({ name: req.body.name});
    await genre.save();
    res.send(genre);
});

router.put('/:id',[validateObjectId,validator(validateGenre)], async(req, res) => {
    const genre = await Genre.findByIdAndUpdate(req.params.id,{
        name: req.body.name
    }, {new: true});

    if(!genre) return res.status(404).send('The genre with the given ID was not found');

    res.send(genre);
});

router.delete('/:id', validateObjectId ,async(req, res) => {
    const genre = await Genre.findByIdAndDelete(req.params.id);

    if(!genre) return res.status(404).send('The genre with the given Id was not found');

    res.send(genre);
});

router.get('/:id', validateObjectId ,async(req, res) => {
    const genre = await Genre.findById(req.params.id);

    if(!genre) return res.status(404).send('The genre with the given Id was not found');

    res.send(genre);
});

module.exports = router;