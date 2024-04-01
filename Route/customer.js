const {Customer, validateCustomer} = require('../models/customer');
const express  = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    const customer = await Customer.find().sort('name');
    const 
})