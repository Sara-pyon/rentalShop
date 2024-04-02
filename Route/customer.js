const validator = require('../middleware/validator');
const {Customer, validateCustomer} = require('../models/customer');
const express  = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/', async(req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.post('/', validator(validateCustomer) ,async(req, res) => {
    let customer = new Customer({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        email: req.body.email,
        isGold: req.body.isGold
    });

    await customer.save();
    res.send(customer);
});

router.put('/:id', [auth, validator(validateCustomer)], async(req, res) => {
    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        email: req.body.email,
        isGold: req.body.isGold
    }, {new: true});

    if(!customer) res.status(404).send('The customer with the given Id was not found.');

    res.send(customer);
});

router.delete('/:id',auth,async(req, res) => {
    const customer = await Customer.findByIdAndDelete(req.params.id);

    if(!customer) res.status(404).send('The customer with the given Id was not found.');

    res.send(customer);
});

router.get('/:id', async(req, res) => {
    const customer = await Customer.findById(req.params.id);

    if(!customer) res.status(404).send('The customer with the given Id was not found.');

    res.send(customer);
});

module.exports = router;